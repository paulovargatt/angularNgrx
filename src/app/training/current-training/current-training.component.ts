import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training';
import {TrainingService} from '../training.service';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0;
    timer: number;
    @Output() trainingExit = new EventEmitter();

    constructor(private dialog: MatDialog,
                private trainingService: TrainingService) {
    }

    ngOnInit() {
       this.startOrResume();
    }


    startOrResume() {
        const step = this.trainingService.getRunningExercice().duration / 100 * 1000;
        this.timer = setInterval(() => {
            this.progress = this.progress + 1;
            if (this.progress >= 100) {
                this.trainingService.completeExercice();
                clearInterval(this.timer);
            }
        }, step);
    }

    onStop() {
        clearInterval(this.timer);
       const dialogRef = this.dialog.open(StopTrainingComponent,
            {
                data: {
                    progress: this.progress
                }
            });
        dialogRef.afterClosed().subscribe((result) => {
            const response = (result as any);
            if (response) {
                this.trainingService.cancelExercice(this.progress);
            } else {
                this.startOrResume();
            }
        });
    }

}
