import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Patient} from "../../util/classes/Patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session")).access};
  }

  getAllPatients(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }

  saveNewPatient(formBody: FormGroup['value']): Observable<any> {
    const body = new HttpParams()
      .set("nome", formBody.nome)
      .set("dataNascimento", formBody.dataNascimento);
    return this.http.post(this.url, body, {headers: this.headers});
  }

  deletePatient(id: Patient['id']): Observable<any> {
    return this.http.delete(this.url + `?id=${id}`, {headers: this.headers});
  }

  editPatient(id: Patient['id'], formBody: FormGroup['value']): Observable<any> {
    const body = new HttpParams()
      .set("id", id)
      .set("nome", formBody.nome)
      .set("dataNascimento", formBody.dataNascimento);
    return this.http.put(this.url, body, {headers: this.headers});
  }
}
