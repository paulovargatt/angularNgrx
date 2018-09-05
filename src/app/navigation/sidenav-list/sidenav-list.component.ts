import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

    @Output() closeSideNav = new EventEmitter();

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
    }


    onLogout() {
        this.authService.logout();
        this.OnClose();
    }


    OnClose() {
        this.closeSideNav.emit();
    }

}
