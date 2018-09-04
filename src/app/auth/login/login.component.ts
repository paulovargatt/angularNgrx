import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
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
