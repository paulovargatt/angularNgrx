import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../training.service';
import {ExerciseModel} from '../exercice.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercices: Observable<ExerciseModel[]>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore
              ) { }

  ngOnInit() {
      this.exercices = this.db.collection('availableExercices')
          .snapshotChanges()
          .pipe(map(docArray => {
            return docArray.map(doc => {
              return{
                id: doc.payload.doc.id,
                  name: doc.payload.doc.data().name,
                  duration: doc.payload.doc.data().duration,
                  calories: doc.payload.doc.data().calories,

              };
            });
          }))

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercice);
  }

}
