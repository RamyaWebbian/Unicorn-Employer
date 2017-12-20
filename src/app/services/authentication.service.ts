import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public switchUrl= 'http://dev-hwaredesign.pantheonsite.io/';
    private loginUrl = this.switchUrl + 'employer_login.json';
    private getHWAtokenUrl =  this.switchUrl + 'jwt/token';

constructor(private http: Http) { }

    getHwatoken(uid) {
      //  alert('fffffffff'+ uid)
         return this.http.get(this.getHWAtokenUrl)
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(response);
                let user = response.json();
              //  alert('ssssssssssssss')
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(typeof localStorage)
                     if (typeof localStorage === 'object') {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                     }else {

                     }
                }
            }).catch((error: any) => error.json());;
    }

    logout() {
        // remove user from local storage to log user out
        if (typeof localStorage === 'object') {
            console.log(typeof localStorage)
            localStorage.removeItem('currentUser');

        }else{

        }
    }
}