import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _data: DataService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boolean> {
    this._data.isLoggedIn().subscribe(() => true, () => this._router.navigate(['/login-page']));
    return this._data.isLoggedIn();
  }
}
