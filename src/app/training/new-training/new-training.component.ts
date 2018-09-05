import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../training.service';
import {ExerciseModel} from '../exercice.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercices: ExerciseModel[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercices = this.trainingService.getAvailableExercices();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.exercice);
  }

}
