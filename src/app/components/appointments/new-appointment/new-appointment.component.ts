import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../services/appointment.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidator} from "../../../validators/DateValidator";

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {
  form: FormGroup;

  constructor(private appointmentService: AppointmentService, private router: Router, private fb: FormBuilder) {
    this.form = fb.group(
      {
        idPaciente: ['', Validators.required],
        idMedico: ['', Validators.required],
        data: ['', [Validators.required, DateValidator.afterToday]]
      }
    )
  }

  ngOnInit(): void {
  }

}
