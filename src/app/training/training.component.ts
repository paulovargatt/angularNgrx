import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TrainingService} from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;

  exerciceSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciceSubscription = this.trainingService.exerciceChanged.subscribe((exercice) => {
          if (exercice) {
            this.onGoingTraining = true;
          }else{
              this.onGoingTraining = false;
          }
    });
  }

}
