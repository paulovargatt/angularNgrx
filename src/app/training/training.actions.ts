import {Action} from '@ngrx/store';
import {ExerciseModel} from './exercice.model';

export const SET_AVAILABLE_TRAININGS = 'SET_AVAILABLE_TRAININGS';
export const SET_FINISH_TRAININGS = 'SET_FINISH_TRAININGS';
export const START_TRAINING = 'START_TRAINING';
export const STOP_TRAINING = 'STOP_TRAINING';

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: ExerciseModel[]){}
}

export class SetFinishTrainings implements Action {
    readonly type = SET_FINISH_TRAININGS;
    constructor(public payload: ExerciseModel[]){}

}

export class StartTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: ExerciseModel[]){}

}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
    constructor(public payload: ExerciseModel[]){}

}

export type TrainingActions =
    SetAvailableTraining |
    SetFinishTrainings |
    StartTraining |
    StopTraining;
