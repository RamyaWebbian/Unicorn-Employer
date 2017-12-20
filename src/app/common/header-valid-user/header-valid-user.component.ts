import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, MemoryStorage } from '../../services/index';

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

  constructor(
    private userService:UserService,
    private memoryStorage:MemoryStorage,
    private router:Router
    ) { }

  ngOnInit() {
      this.userService.getLogedIn().subscribe((islogedin: boolean) => {
         console.log(islogedin)
      this.isLogedin = islogedin;
    // alert(islogedin)
      if (islogedin) {
       
        this.user = JSON.parse(localStorage.getItem('currentUser'));
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
          this.router.navigate(['/login']);
        }
      } else {
        this.isLogedin = false;
         this.router.navigate(['/login']);
      }
    });
  }

logout() {
console.log('isLocalStorage ',this.userService.isLocalStorage());

   if (this.userService.isLocalStorage()) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
      this.userService.setLogedIn(false);
   }else{
      this.memoryStorage.removeItem('userToken');
      this.memoryStorage.removeItem('currentUser');
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

}
