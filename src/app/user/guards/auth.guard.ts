import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/index';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
     private cookieService:CookieService,
     private userService:UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(this.userService.isLocalStorage()){
        if (localStorage.getItem('userToken')) {
                    // logged in so return true
                    return true;
                }
        }else{
            if (this.cookieService.get('userToken')) {
                    // logged in so return true
                    return true;
                }
}
       

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']); //,{ queryParams: { returnUrl: state.url }}
        return false;
    }

  
}