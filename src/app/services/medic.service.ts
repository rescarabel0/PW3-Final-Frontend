import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session")).access};
  }

  getAllMedics(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }

  saveNewMedic(formBody: FormGroup['value']): Observable<any> {
    const body = new HttpParams()
      .set("nome", formBody.nome)
      .set("idEspecialidade", formBody.idEspecialidade);

    return this.http.post(this.url, body, {headers: this.headers});
  }
}
