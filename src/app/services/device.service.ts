import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Device} from "../../util/classes/Device";
import {Room} from "../../util/classes/Room";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private url = "http://localhost:8081/device";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session-auto")).access};
  }

  getAllDevices(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }

  saveNewDevice(formBody: FormGroup['value']): Observable<any> {
    return this.http.post(this.url, formBody, {headers: this.headers});
  }

  deleteDevice(id: Device['id']): Observable<any> {
    return this.http.delete(this.url + `/${id}`, {headers: this.headers});
  }

  editDevice(id: Device['id'], formBody: FormGroup['value']): Observable<any> {
    return this.http.put(this.url + `/${id}`, formBody, {headers: this.headers});
  }

  addDeviceToRoom(id: Room['id'], device: Device): Observable<any> {
    return this.http.put(`http://localhost:8081/room/devices/add/${id}`, device, {headers: this.headers});
  }
}
