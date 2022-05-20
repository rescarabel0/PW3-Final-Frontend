import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MedicService} from "../../../services/medic.service";
import {SpecialtyService} from "../../../services/specialty.service";
import {Specialty} from "../../../../util/classes/Specialty";
import {Medic} from "../../../../util/classes/Medic";

@Component({
  selector: 'app-new-medic',
  templateUrl: './new-medic.component.html',
  styleUrls: ['./new-medic.component.scss']
})
export class NewMedicComponent implements OnInit {
  form: FormGroup;
  specialties: Specialty[];
  loading = true;

  constructor(private fb: FormBuilder, private medicService: MedicService, private specialtyService: SpecialtyService, private router: Router) {
    this.form = fb.group({
      nome: ['', Validators.required],
      idEspecialidade: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.specialtyService.getAllSpecialties().subscribe(
      (res: Specialty[]) => {
        this.specialties = res;
        this.loading = false;
      }
    )
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente!");
      return;
    }
    this.medicService.saveNewMedic(this.form.value).subscribe(
      (res: Medic) => {
        if (res && res.id) {
          alert(`Médico #${res.id} salvo com sucesso.`);
          this.router.navigateByUrl("../");
        } else {
          alert("Erro ao salvar.");
        }
      }
    )
  }

}
