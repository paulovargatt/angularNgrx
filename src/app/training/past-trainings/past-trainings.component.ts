import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExerciseModel} from '../exercice.model';
import {TrainingService} from '../training.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html',
    styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    dataSource = new MatTableDataSource<ExerciseModel>();
    private changedSubscription: Subscription;

    constructor(private trainingService: TrainingService) {
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: String) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }



    ngOnInit() {
        this.changedSubscription = this.trainingService.finishdExercicesChanged.subscribe((exercices) => {
            this.dataSource.data = exercices;
        })
         this.trainingService.fetchCompletedOrCancelledExercices();
    }

    ngOnDestroy(){
        this.changedSubscription.unsubscribe();
    }

}
