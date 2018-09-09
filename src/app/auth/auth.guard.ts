import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private store: Store<any>,
                private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    }
    canLoad(route: Route){
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}