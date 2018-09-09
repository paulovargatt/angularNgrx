import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isAuth$: Observable<boolean>;
    authSubscription: Subscription;

    @Output() sidenavToggle = new EventEmitter();

    constructor(private store: Store<any>,
                private authService: AuthService
                ) {
    }

    ngOnInit() {
       this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    toggleSidenav() {
        this.sidenavToggle.emit();
    }

    Onlogout() {
        this.authService.logout();
    }

}
