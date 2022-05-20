import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DateValidator} from "../../../validators/DateValidator";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) {
    this.form = fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', [Validators.required, DateValidator.beforeToday]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente.");
      return;
    }
    this.patientService.saveNewPatient(this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Paciente #${res.id} salvo com sucesso!`);
          this.router.navigateByUrl("/patients")
        } else if (res.status === "Error") {
          alert(res.msg);
          return;
        }
      }
    )
  }

}
