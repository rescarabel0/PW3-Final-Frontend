import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/auth/login/login.component';
import {ListPatientsComponent} from './components/patient/list-patients/list-patients.component';
import {NewPatientComponent} from './components/patient/new-patient/new-patient.component';
import {EditPatientComponent} from './components/patient/edit-patient/edit-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ListPatientsComponent,
    NewPatientComponent,
    EditPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
