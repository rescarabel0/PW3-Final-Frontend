import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MedicService} from "../../../services/medic.service";
import {Medic} from "../../../../util/classes/Medic";
import {Specialty} from "../../../../util/classes/Specialty";
import {SpecialtyService} from "../../../services/specialty.service";

@Component({
  selector: 'app-edit-medic',
  templateUrl: './edit-medic.component.html',
  styleUrls: ['./edit-medic.component.scss']
})
export class EditMedicComponent implements OnInit {
  form: FormGroup;
  medicId: number;
  specialties: Specialty[];
  loading = true;

  constructor(private fb: FormBuilder, private medicService: MedicService, private specialtyService: SpecialtyService, private router: Router, private route: ActivatedRoute) {
    this.medicId = parseInt(route.snapshot.paramMap.get("id"));
    if (!this.medicId) {
      alert("Informe um id válido!");
      this.router.navigateByUrl("/medics");
    }
    medicService.getAllMedics().subscribe(
      (res: Medic[]) => {
        let foundMedic = res.find(p => p.id === this.medicId);
        if (foundMedic) {
          this.form = fb.group({
            nome: [foundMedic.nome, Validators.required],
            idEspecialidade: [foundMedic.idEspecialidade, Validators.required]
          })
        } else {
          alert("Informe um id válido!");
          this.router.navigateByUrl("/medics");
        }
      }
    )
    this.specialtyService.getAllSpecialties().subscribe(
      (res: Specialty[]) => {
        this.specialties = res;
        this.loading = false;
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
    this.medicService.editMedic(this.medicId, this.form.value).subscribe(
      (res) => {
        if (res && res.id) {
          alert(`Médico #${res.id} editado com sucesso`);
          this.router.navigate(['medics']);
        } else {
          alert(res.msg);
        }
      }
    )
  }
}
