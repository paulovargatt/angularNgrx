import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {ExerciseModel} from '../exercice.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercices;
  exercicesSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore
              ) { }

  ngOnInit() {
    this. exercicesSubscription = this.trainingService.exercicesChanged.subscribe(exercices =>
        (this.exercices = exercices)
    );
     this.fetchExercice();
  }

  ngOnDestroy(){
    this.exercicesSubscription.unsubscribe();
  }

    fetchExercice(){
        this.trainingService.fetchAvailableExercices();
    }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercice);
  }

}
