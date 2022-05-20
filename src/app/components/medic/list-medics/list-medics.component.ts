import {Component, OnInit} from '@angular/core';
import {MedicService} from "../../../services/medic.service";
import {Medic} from "../../../../util/classes/Medic";
import {Specialty} from "../../../../util/classes/Specialty";
import {SpecialtyService} from "../../../services/specialty.service";

@Component({
  selector: 'app-list-medics',
  templateUrl: './list-medics.component.html',
  styleUrls: ['./list-medics.component.scss']
})
export class ListMedicsComponent implements OnInit {
  medics: Medic[];
  specialties: Specialty[];
  loading = true;

  constructor(private medicService: MedicService, private specialtyService: SpecialtyService) {
  }

  ngOnInit(): void {
    this.specialtyService.getAllSpecialties().subscribe(
      (res: Specialty[]) => {
        this.specialties = res;
      }
    )
    this.medicService.getAllMedics().subscribe(
      (res: Medic[]) => {
        this.medics = res;
        this.loading = false;
      }
    )
  }

  getSpecialtyById(id: Specialty['id']): Specialty {
    return this.specialties ? this.specialties.find(s => s.id === id) : null;
  }

}
