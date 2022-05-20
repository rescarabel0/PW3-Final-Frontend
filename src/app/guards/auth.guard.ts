import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      this.router.navigateByUrl("/auth/login");
      alert("Faça login para entrar no site!");
      return false;
    }

    const sessionExpiry: number = session.expiry;
    if (sessionExpiry <= new Date().getTime()) {
      this.router.navigateByUrl("/auth/login");
      alert("Sua sessão expirou.");
      return false;
    }

    return true;
  }

}
