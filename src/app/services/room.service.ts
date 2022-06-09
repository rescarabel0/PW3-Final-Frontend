import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Room} from "../../util/classes/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = "http://localhost:8081/room";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session-auto")).access};
  }

  getAllRooms(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }

  saveNewRoom(formBody: FormGroup['value']): Observable<any> {
    return this.http.post(this.url, formBody, {headers: this.headers});
  }

  deleteRoom(id: Room['id']): Observable<any> {
    return this.http.delete(this.url + `/${id}`, {headers: this.headers});
  }

  editRoom(id: Room['id'], formBody: FormGroup['value']): Observable<any> {
    return this.http.put(this.url + `/${id}`, formBody, {headers: this.headers});
  }
}
