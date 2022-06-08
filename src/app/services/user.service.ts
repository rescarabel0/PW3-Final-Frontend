import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8081";

  constructor(private http: HttpClient) {
  }

  signUp(formBody: FormGroup['value']): Observable<any> {
    return this.http.post(this.url + "/user/sign-up", formBody);
  }

  login(formBody: FormGroup['value']): Observable<any> {
    return this.http.post(this.url + "/auth/sign-in", formBody);
  }
}
