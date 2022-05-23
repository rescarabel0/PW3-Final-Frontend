import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import {Router} from "@angular/router";
import {Appointment} from "../../../../util/classes/Appointment";
import {MedicService} from "../../../services/medic.service";
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../../util/classes/Patient";
import {Medic} from "../../../../util/classes/Medic";

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent implements OnInit {
  appointments: Appointment[];
  patients: Patient[];
  medics: Medic[];
  loading = true;

  constructor(private appointmentService: AppointmentService, private medicService: MedicService, private patientService: PatientService, private router: Router) {
  }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(
      (res: Patient[]) => {
        this.patients = res;
        this.medicService.getAllMedics().subscribe(
          (res: Medic[]) => {
            this.medics = res;
            this.appointmentService.getAllAppointments().subscribe(
              (res: Appointment[]) => {
                this.appointments = res;
                this.loading = false;
              }
            )
          }
        )
      }
    )
  }

  getMedicById(id: Medic['id']): Medic {
    return this.medics.find(m => m.id === id);
  }

  getPatientById(id: Patient['id']): Patient {
    return this.patients.find(m => m.id === id);
  }

  deleteAppointment(id: Appointment['id']): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      (res) => {
        alert(res.msg);
        window.location.reload();
      }, (err) => {
        alert(err.msg);
      }
    )
  }
}
