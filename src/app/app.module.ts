import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {MaterialModule} from "./material.module";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from "./app.routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {StopTrainingComponent} from './training/current-training/stop-training';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UiService} from './shared/ui.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
        StopTrainingComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [AuthService, TrainingService,UiService],
    bootstrap: [AppComponent],
    entryComponents: [StopTrainingComponent]
})
export class AppModule {
}
