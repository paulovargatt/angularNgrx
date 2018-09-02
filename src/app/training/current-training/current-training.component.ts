import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0;
    timer: number;
    @Output() trainingExit = new EventEmitter();

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
       this.startOrResume();
    }

    startOrResume(){
        this.timer = setInterval(() => {
            this.progress = this.progress + 5;
            if (this.progress === 100) {
                clearInterval(this.timer);
            }
        }, 100);
    }

    onStop() {
        clearInterval(this.timer);
       const dialogRef = this.dialog.open(StopTrainingComponent,
            {
                data: {
                    progress: this.progress
                }
            });
        dialogRef.afterClosed()._subscribe(result => {
            if (result) {
                this.trainingExit.emit();
            } else {
                this.startOrResume();
            }
        });
    }

}
