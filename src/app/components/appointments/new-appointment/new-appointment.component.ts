import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidator} from "../../../validators/DateValidator";
import {Medic} from "../../../../util/classes/Medic";
import {Patient} from "../../../../util/classes/Patient";
import {MedicService} from "../../../services/medic.service";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {
  form: FormGroup;
  loading = true;

  medics: Medic[];
  patients: Patient[];

  constructor(private appointmentService: AppointmentService,
              private medicService: MedicService,
              private patientService: PatientService,
              private router: Router,
              private fb: FormBuilder) {
    this.form = fb.group(
      {
        idPaciente: ['', Validators.required],
        idMedico: ['', Validators.required],
        data: ['', [Validators.required, DateValidator.afterToday]]
      }
    )
    patientService.getAllPatients().subscribe(
      (res: Patient[]) => {
        this.patients = res;
        medicService.getAllMedics().subscribe(
          (res: Medic[]) => {
            this.medics = res;
            this.loading = false;
          }
        )
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
    this.appointmentService.saveNewAppointment(this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Consulta em ${res.data} agendada com sucesso!`);
          this.router.navigate(['/appointments'])
        } else {
          alert(res.msg);
        }
      }
    )
  }

}
