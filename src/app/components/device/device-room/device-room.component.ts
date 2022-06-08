import {Component, OnInit} from '@angular/core';
import {Device} from "../../../../util/classes/Device";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeviceService} from "../../../services/device.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {Room} from "../../../../util/classes/Room";

@Component({
  selector: 'app-device-room',
  templateUrl: './device-room.component.html',
  styleUrls: ['./device-room.component.scss']
})
export class DeviceRoomComponent implements OnInit {
  form: FormGroup;
  deviceId: number;
  device: Device;
  rooms: Room[];
  loading = true;

  constructor(private fb: FormBuilder, private deviceService: DeviceService, private router: Router, private route: ActivatedRoute, private roomService: RoomService) {
    this.deviceId = parseInt(route.snapshot.paramMap.get("id"));
    if (!this.deviceId) {
      alert("Informe um id válido!");
      this.router.navigateByUrl("/medics");
    }
    deviceService.getAllDevices().subscribe(
      (res: Device[]) => {
        let foundDevice = res.find(p => p.id === this.deviceId);
        if (foundDevice) {
          this.device = foundDevice;
          roomService.getAllRooms().subscribe(
            (res) => {
              this.rooms = res;
              this.form = fb.group({
                room: ['', Validators.required]
              })
              this.loading = false;
            }
          )
        } else {
          alert("Informe um id válido!");
          this.router.navigateByUrl("/devices");
        }
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.deviceService.addDeviceToRoom(this.form.controls.room.value, this.device)
      .subscribe(
        (res) => {
          alert("Dispositivo associado com sucesso!");
          this.router.navigate(['/rooms'])
        }
      )
  }

}
