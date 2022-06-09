import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = fb.group({
      name: ['', Validators.required],
      routineStartsAt: ['', Validators.required],
      routineEndsAt: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente!");
      return;
    }
    this.userService.signUp(this.form.value).subscribe(
      (res) => {
        if (res.id) {
          alert("Cadastrado com sucesso! Redirecionado para página de login...");
          this.router.navigate(['/auth/login'])
        }
      },
      (err) => {
        alert("Cadastro inválido!");
      }
    )
  }

}
