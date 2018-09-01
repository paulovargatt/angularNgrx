import {NgModule} from "@angular/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter/";
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
    MatCheckboxModule,
    MatInputModule} from "@angular/material";


@NgModule({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDatepickerModule,
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})

export class MaterialModule {
    
}