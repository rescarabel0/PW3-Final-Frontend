import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../../../services/device.service";
import {Device} from "../../../../util/classes/Device";

@Component({
  selector: 'app-list-medics',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss']
})
export class ListDevicesComponent implements OnInit {
  devices: Device[];
  loading = true;

  constructor(private medicService: DeviceService) {
  }

  ngOnInit(): void {
    this.medicService.getAllDevices().subscribe(
      (res: Device[]) => {
        this.devices = res;
        this.loading = false;
      }
    )
  }

  deleteDevice(id: Device['id']): void {
    this.medicService.deleteDevice(id).subscribe(
      () => {
        alert("Dispositivo deletado com sucesso!!");
        window.location.reload();
      }
    )
  }

  addToRoom(id: Device['id']): void {

  }

}
