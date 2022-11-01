import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiClientService } from '../services/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGuard implements CanActivate {

  constructor(private apiClient: ApiClientService, private router: Router) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result = this.apiClient.authenticatedConsumer();
    result.subscribe(res => {if(!res) {this.router.navigateByUrl("")}});
    return result;
  }
  
}
