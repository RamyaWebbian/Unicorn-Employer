import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class GardToken implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate() {
        if (localStorage.getItem('userToken')) {
            // logged in so return true
            this.userService.getUserData();
            this.userService.setLogedIn(true);
            return true;
        }
        // not logged in so redirect to login page
        this.userService.setLogedIn(false);
        this.router.navigate(['/login']);
        return false;
    }
}
