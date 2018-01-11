import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-valid-user',
  templateUrl: './header-valid-user.component.html',
  styleUrls: ['./header-valid-user.component.css']
})
export class HeaderValidUserComponent implements OnInit {
  public isLogedin = false;
  public user: any;
  public  businessName: string;
  public firstName: string;
  checkOpen: boolean;
  openedMenu = true;

  constructor(
    private userService:UserService,
    private cookieService:CookieService,
    private router:Router

    ) { }

  ngOnInit() {

    this.userService.isInSession();
    
      this.userService.getLogedIn().subscribe((islogedin: boolean) => {
       //  console.log(islogedin)
      this.isLogedin = islogedin;
    // alert(islogedin)
      if (islogedin) {
        if (this.userService.isLocalStorage()) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        }else{
           // token = JSON.parse(this.cookieService.get('userToken'));
        this.user = JSON.parse(this.cookieService.get('currentUser'));
        }
        if (this.user) {
          if (this.user.details) {
            if (this.user.details.field_name_of_your_business[0]) {
              this.businessName = this.user.details.field_name_of_your_business[0].value;
            }
            if (this.user.details.field_first_name[0]) {
              this.firstName = this.user.details.field_first_name[0].value;
            }
          }
        } else {
          this.userService.setLogedIn(false);
         // alert('aaaaaaaaaaaaaaaa')
          this.router.navigate(['/login']);
        }
      } else {
        this.isLogedin = false;
         this.router.navigate(['/login']);
      }
    });
  }

logout() {
// console.log('isLocalStorage ',this.userService.isLocalStorage());

   if (this.userService.isLocalStorage()) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
      this.userService.setLogedIn(false);
   }else{

    this.cookieService.delete('userToken');
    this.cookieService.delete('currentUser');
    this.userService.setLogedIn(false);
   } 

 /* this.userService.logout().subscribe((res: any) => {
  console.log(res)
  if(localStorage.getItem('userToken')) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('currentUser')
  this.router.navigate(['/login']);
  }
   this.userService.setLogedIn(false);
 }); */
}

  sideBarOpen() {
    this.checkOpen = true;
  }
  
  closeHelp() {
   this.checkOpen = false;
    console.log("closed");
  }

}
