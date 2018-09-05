import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuth: boolean;
    authSubscription: Subscription;

    @Output() sidenavToggle = new EventEmitter();

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(authstatus => {
            this.isAuth = authstatus;
        });
    }

    toggleSidenav() {
        this.sidenavToggle.emit();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    Onlogout() {
        this.authService.logout();
    }

}
