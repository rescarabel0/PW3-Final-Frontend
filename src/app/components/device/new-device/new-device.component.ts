import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DeviceService} from "../../../services/device.service";
import {Device} from "../../../../util/classes/Device";

@Component({
  selector: 'app-new-medic',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.scss']
})
export class NewDeviceComponent implements OnInit {
  form: FormGroup;
  types = [
    "MOTOR",
    "LIGHT",
    "MEDIA_PLAYER",
    "THERMOSTAT",
    "RECEIVER"
  ];

  constructor(private fb: FormBuilder, private deviceService: DeviceService, private router: Router) {
    this.form = fb.group({
      model: ['', Validators.required],
      manufacturer: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Preencha o formulário corretamente!");
      return;
    }
    this.deviceService.saveNewDevice(this.form.value).subscribe(
      (res: Device) => {
        if (res && res.id) {
          alert(`Dispositivo #${res.id} salvo com sucesso.`);
          this.router.navigate(["/devices"]);
        } else {
          alert("Erro ao salvar.");
        }
      }
    )
  }

}
