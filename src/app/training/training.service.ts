import {ExerciseModel} from './exercice.model';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';

@Injectable()

export class TrainingService {
    exerciceChanged = new Subject();
    exercicesChanged = new Subject();

    private availableExercices: ExerciseModel[] = [];

    private runningExercice: ExerciseModel;
    private exercices: ExerciseModel[] = [];
    public finishdExercicesChanged = new Subject<ExerciseModel[]>();
    private finishedExercices: ExerciseModel[] = [];

    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore){}


    fetchAvailableExercices(){
     this.fbSubs.push(this.db.collection('availableExercices')
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories,
                    };
                });
            })).subscribe(exercices => {
                this.availableExercices  = exercices;
                this.exercicesChanged.next([...this.availableExercices]);
            }));
        };

    private addDataFirebase(exercice) {
        this.db.collection('finishedExercices').add(exercice);
    }


    startExercice(selectId: string){
        this.runningExercice = this.availableExercices.find(ex => ex.id === selectId);
        this.exerciceChanged.next({...this.runningExercice})
    }

    getRunningExercice(){
        return {...this.runningExercice}
    }

    completeExercice(){
        this.addDataFirebase({
         ...this.runningExercice, date: new Date(), state: 'completed'
        });
        this.runningExercice = null;
        this.exerciceChanged.next(null)
    }

    cancelExercice(progress: number){
        this.addDataFirebase({
            ...this.runningExercice,
            duration: this.runningExercice.duration * (progress / 100),
            calories: this.runningExercice.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercice = null;
        this.exerciceChanged.next(null)
    }

    fetchCompletedOrCancelledExercices(){
        this.fbSubs.push(
        this.db.collection('finishedExercices').valueChanges().subscribe((exercices) => {
            this.finishdExercicesChanged.next(exercices);
        }))
    }

    cancelSubscription(){
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        })
    }
}
