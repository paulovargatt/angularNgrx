import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

    @Output() closeSideNav = new EventEmitter();
    isAuth$: Observable<boolean>;

    constructor(public authService: AuthService,
                private store: Store<any>
                ) {
    }

    ngOnInit() {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }


    onLogout() {
        this.authService.logout();
        this.OnClose();
    }


    OnClose() {
        this.closeSideNav.emit();
    }

}
