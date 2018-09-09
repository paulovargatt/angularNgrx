import {SET_AVAILABLE_TRAININGS, SET_FINISH_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions} from './training.actions';
import {Action} from '@ngrx/store';
import {ExerciseModel} from './exercice.model';
import * as fromRoot from '../app.reducer';
import {st} from '@angular/core/src/render3';


export interface TrainingState {
    availableExercices: ExerciseModel[];
    finishedExercices: ExerciseModel[];
    activeTraining: ExerciseModel;
}

export interface State extends fromRoot.State {
    training: TrainingState;
};

const initialState: TrainingState = {
    availableExercices: [],
    finishedExercices: [],
    activeTraining: null
};

export function authReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercices: action.payload
            };
        case SET_FINISH_TRAININGS:
            return {
                ...state,
                finishedExercices: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: action.payload
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }
}


export const getAvailableExercices = (state: TrainingState) => state.availableExercices;
export const getFinishExercices = (state: TrainingState) => state.finishedExercices;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;
