import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm;
    isLoading = false;
    private loadingSub: Subscription;

    constructor(private authService: AuthService,
                private uiService: UiService
                ) {
    }

    ngOnInit() {
        this.loadingSub = this.uiService.loadingStateChanged.subscribe((loadingState) => {
            this.isLoading = loadingState;
        })
        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {validators: [Validators.required]})
        });
    }

    ngOnDestroy() {
        this.loadingSub.unsubscribe();
    }

    onSubmit(form: NgForm) {
        console.log(form)
        this.authService.login({
            email: form.value.email,
            password: form.value.password,
        });
    }
}
