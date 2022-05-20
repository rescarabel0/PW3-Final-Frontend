import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {LoginComponent} from "./components/auth/login/login.component";

const routes: Routes = [
  {
    path: "auth", children: [
      {path: "", pathMatch: "full", redirectTo: "login"},
      {path: "sign-up", component: SignUpComponent},
      {path: "login", component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
