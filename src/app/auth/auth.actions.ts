import {Action} from '@ngrx/store';

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

export class Authenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class Unauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = Authenticated | Unauthenticated;


