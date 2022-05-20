import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateValidator} from "../../../validators/DateValidator";
import {Patient} from "../../../../util/classes/Patient";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  form: FormGroup;
  patientId: number;

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router, private route: ActivatedRoute) {
    this.patientId = parseInt(route.snapshot.paramMap.get("id"));
    if (!this.patientId) {
      alert("Informe um id válido!");
      this.router.navigateByUrl("/patients");
    }
    patientService.getAllPatients().subscribe(
      (res: Patient[]) => {
        let foundPatient = res.find(p => p.id === this.patientId);
        if (foundPatient) {
          this.form = fb.group({
            nome: [foundPatient.nome, Validators.required],
            dataNascimento: [foundPatient.dataNascimento, [Validators.required, DateValidator.beforeToday]]
          })
        } else {
          alert("Informe um id válido!");
          this.router.navigateByUrl("/patients");
        }
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente!");
      return;
    }
    this.patientService.editPatient(this.patientId, this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Paciente #${res.id} editado com sucesso.`);
          this.router.navigateByUrl("/patients");
        }
      }
    )
  }
}
