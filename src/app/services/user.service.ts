import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/administradores.php";

  constructor(private http: HttpClient) {
  }

  signUp(formBody: FormGroup['value']): Observable<any> {
    let body = new HttpParams()
      .set("login", formBody.login)
      .set("senha", formBody.senha);

    return this.http.put(this.url, body);
  }

  login(formBody: FormGroup['value']): Observable<any> {
    let body = new HttpParams()
      .set("login", formBody.login)
      .set("senha", formBody.senha);

    return this.http.post(this.url, body);
  }
}
