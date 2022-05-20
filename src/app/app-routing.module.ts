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

const routes: Routes = [
    {
      path: "auth", children: [
        {path: "", pathMatch: "full", redirectTo: "login"},
        {path: "sign-up", component: SignUpComponent},
        {path: "login", component: LoginComponent}
      ]
    },
    {path: "", pathMatch: "full", redirectTo: "patients"},
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
        {path: "new", component: NewMedicComponent}
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
