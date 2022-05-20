import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/especialidades.php";
  private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = {"Authorization": "Bearer " + JSON.parse(localStorage.getItem("session")).access};
  }

  getAllSpecialties(): Observable<any> {
    return this.http.get(this.url, {headers: this.headers});
  }
}
