import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Appointment} from "../../util/classes/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session")).access};
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url, {headers: this.headers});
  }

  saveNewAppointment(formBody: FormGroup['value']): Observable<Appointment> {
    const body = new HttpParams()
      .set("idPaciente", formBody.idPaciente)
      .set("idMedico", formBody.idMedico)
      .set("data", formBody.data);

    return this.http.post<Appointment>(this.url, body, {headers: this.headers});
  }

  deleteAppointment(id: Appointment['id']): Observable<any> {
    return this.http.delete(this.url + `?id=${id}`, {headers: this.headers})
  }
}
