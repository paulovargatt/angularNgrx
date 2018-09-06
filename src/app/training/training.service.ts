import {ExerciseModel} from './exercice.model';
import {Subject} from 'rxjs';

export class TrainingService {
    private availableExercices: ExerciseModel[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercice: ExerciseModel;
    exerciceChanged = new Subject();
    private exercices: ExerciseModel[] = [];

    getAvailableExercices(){
        return this.availableExercices.slice();
    }

    startExercice(selectId: string){
        this.runningExercice = this.availableExercices.find(ex => ex.id === selectId);
        this.exerciceChanged.next({...this.runningExercice})
    }

    getRunningExercice(){
        return {...this.runningExercice}
    }

    completeExercice(){
        this.exercices.push({...this.runningExercice, date: new Date(), state: 'completed'})
        this.runningExercice = null;
        this.exerciceChanged.next(null)
    }

    cancelExercice(progress: number){
        this.exercices.push({
            ...this.runningExercice,
            duration: this.runningExercice.duration * (progress / 100),
            calories: this.runningExercice.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercice = null;
        this.exerciceChanged.next(null)
    }

    getCompletedOrCancelledExercices(){
        return this.exercices;
    }
}
