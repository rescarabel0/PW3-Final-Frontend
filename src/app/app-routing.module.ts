import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {ListPatientsComponent} from "./components/patient/list-patients/list-patients.component";
import {AuthGuard} from "./guards/auth.guard";
import {NewPatientComponent} from "./components/patient/new-patient/new-patient.component";
import {EditPatientComponent} from "./components/patient/edit-patient/edit-patient.component";
import {ListMedicsComponent} from "./components/medic/list-medics/list-medics.component";
import {NewMedicComponent} from "./components/medic/new-medic/new-medic.component";
import {EditMedicComponent} from "./components/medic/edit-medic/edit-medic.component";
import {ListAppointmentsComponent} from "./components/appointments/list-appointments/list-appointments.component";
import {NewAppointmentComponent} from "./components/appointments/new-appointment/new-appointment.component";
import {EditAppointmentComponent} from "./components/appointments/edit-appointment/edit-appointment.component";

const routes: Routes = [
  {
    path: "auth", children: [
      {path: "", pathMatch: "full", redirectTo: "login"},
      {path: "sign-up", component: SignUpComponent},
      {path: "login", component: LoginComponent}
    ]
  },
  {path: "", pathMatch: "full", redirectTo: "appointments"},
  {
    path: "patients", children: [
      {path: "", pathMatch: "full", component: ListPatientsComponent},
      {path: "new", component: NewPatientComponent},
      {path: "edit/:id", component: EditPatientComponent}
    ], canActivate: [AuthGuard]
  },
  {
    path: "medics", children: [
      {path: "", pathMatch: "full", component: ListMedicsComponent},
        {path: "new", component: NewMedicComponent},
        {path: "edit/:id", component: EditMedicComponent}
      ], canActivate: [AuthGuard]
    },
    {
      path: "appointments", children: [
        {path: "", pathMatch: "full", component: ListAppointmentsComponent},
        {path: "new", component: NewAppointmentComponent},
        {path: "edit/:id", component: EditAppointmentComponent}
      ], canActivate: [AuthGuard]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
