import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Medic} from "../../../../util/classes/Medic";
import {Patient} from "../../../../util/classes/Patient";
import {AppointmentService} from "../../../services/appointment.service";
import {MedicService} from "../../../services/medic.service";
import {PatientService} from "../../../services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateValidator} from "../../../validators/DateValidator";
import {Appointment} from "../../../../util/classes/Appointment";

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  form: FormGroup;
  loading = true;
  appointmentId: Appointment['id'];

  medics: Medic[];
  patients: Patient[];

  constructor(private appointmentService: AppointmentService,
              private medicService: MedicService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.appointmentId = parseInt(route.snapshot.paramMap.get("id"));
    if (!this.appointmentId) {
      alert("Informe um id válido!");
      this.router.navigateByUrl("/appointments");
    }
    appointmentService.getAllAppointments().subscribe(
      (res: Appointment[]) => {
        let foundAppointment = res.find(a => a.id === this.appointmentId);
        if (foundAppointment) {
          this.form = fb.group(
            {
              idPaciente: [foundAppointment.idPaciente, Validators.required],
              idMedico: [foundAppointment.idMedico, Validators.required],
              data: [foundAppointment.data.replace(" ", "T"), [Validators.required, DateValidator.afterToday]]
            }
          )
        } else {
          alert("Informe um id válido!");
          this.router.navigateByUrl("/appointments");
        }
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
      alert("Preencha o formulário corretamente.");
      return;
    }
    this.form.controls.data.setValue(this.form.controls.data.value.replace("T", " "));
    this.appointmentService.editAppointment(this.appointmentId, this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Consulta ${res.id} editada com sucesso.`);
          this.router.navigate(["/appointments"]);
        }
      }
    )
  }
}
