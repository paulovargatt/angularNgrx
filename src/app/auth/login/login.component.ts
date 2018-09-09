import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UiService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm;
    isLoading$;

    constructor(private authService: AuthService,
                private uiService: UiService,
                private store: Store<fromRoot.State>
                ) {
    }

    ngOnInit() {

     //   this.isLoading$ = this.store.pipe(map(value => value.ui.isLoading));
     //   this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.isLoading$ = this.store.pipe(map(value =>  value.ui.isLoading ));



        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {validators: [Validators.required]})
        });
    }



    onSubmit(form: NgForm) {
        console.log(form)
        this.authService.login({
            email: form.value.email,
            password: form.value.password,
        });
    }
}
