import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
  private readonly bearer = "";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.bearer = JSON.parse(localStorage.getItem("session")).access;
    this.headers = {"Authorization": "Bearer " + this.bearer};
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
}
