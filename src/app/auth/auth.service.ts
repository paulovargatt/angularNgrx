import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';

@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: UserModel;
    private isAuthenticate = false;

    constructor(private router: Router,
                private auth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackbar: MatSnackBar,
                private uiservice: UiService

    )
    {}

    initAuthListener(){
        this.auth.authState.subscribe((user)=>{
            if(user){
                this.isAuthenticate = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscription();
                this.authChange.next(false);
                this.router.navigate(['']);
                this.isAuthenticate = false;
            }
        })
    }

    registerUser(authData: AuthDataModel) {
        this.uiservice.loadingStateChanged.next(true);
        this.auth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiservice.loadingStateChanged.next(false);

            }).catch(err => {
            this.uiservice.loadingStateChanged.next(false);
            this.uiservice.showSnackbar(err.message, null, 3000);
        });
   }

    login(authData: AuthDataModel) {
        this.uiservice.loadingStateChanged.next(true);

        this.auth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiservice.loadingStateChanged.next(false);

        }).catch(err => {
            this.uiservice.loadingStateChanged.next(false);
            this.snackbar.open(err.message, null,{
                duration: 3000
            })
        });
    }

    logout() {
        this.trainingService.cancelSubscription();
        this.auth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['']);
        this.isAuthenticate = false;
    }



    isAuth() {
        return this.isAuthenticate;
    }
}
