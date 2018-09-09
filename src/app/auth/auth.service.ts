import {UserModel} from './user.model';
import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions';


@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: UserModel;
    private isAuthenticate = false;

    constructor(private router: Router,
                private auth: AngularFireAuth,
                private trainingService: TrainingService,
                private snackbar: MatSnackBar,
                private uiservice: UiService,
                private store: Store<any>

    )
    {}

    initAuthListener(){
        this.auth.authState.subscribe((user)=>{
            if(user){
                this.store.dispatch(new Auth.Authenticated())
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscription();
                this.store.dispatch(new Auth.Unauthenticated())
                this.router.navigate(['']);
            }
        })
    }

    registerUser(authData: AuthDataModel) {
       //this.uiservice.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.auth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            //this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())

        }).catch(err => {
          //  this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
            this.uiservice.showSnackbar(err.message, null, 3000);
        });
   }

    login(authData: AuthDataModel) {
        //this.uiservice.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.auth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
          //  this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())


        }).catch(err => {
          //  this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())


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
}
