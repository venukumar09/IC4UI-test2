import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: LocalStorageService) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // this.storage.store('token','asfdasdfas');
      // let t =this.storage.retrieve('token');
  //  console.log(this.storage.retrieve('token'))
    if(this.storage.retrieve('token')){
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}