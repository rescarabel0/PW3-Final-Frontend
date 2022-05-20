import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../../util/classes/Patient";

@Component({
  selector: 'app-patient',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
  patients: Patient[];
  loading = false;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.patientService.getAllPatients()
      .subscribe(
        (res: Patient[]) => {
          this.loading = false
          this.patients = res;
        }
      )
  }

}
