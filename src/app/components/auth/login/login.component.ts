import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.login(this.form.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem("session", JSON.stringify({
            "access": res.token,
            "expiry": new Date().getTime() + 5 * 60000
          }));
          alert("Entrou com sucesso! Redirecionando para tela inicial...");
          this.router.navigate(['']);
        } else if (res.status && res.status === "Erro") {
          alert(res.msg);
          return;
        }
      }
    )
  }
}
