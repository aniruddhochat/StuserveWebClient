import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiClientService } from '../services/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private apiClient: ApiClientService, private router: Router) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.apiClient.loggedIn) {this.router.navigateByUrl("")};
    return this.apiClient.loggedIn;
  }
  
}
