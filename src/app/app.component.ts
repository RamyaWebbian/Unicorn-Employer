import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, HoldDataService } from './services/index';
//import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public options = {
    position: ['top', 'center'],
    timeOut: 6000,
    lastOnBottom: true
  };

public className:string = 'alertgreen';
public message = '';

  constructor(
  private router : Router,
  private userService:UserService,
  private holdDataService:HoldDataService,
  //private _notificationsService: NotificationsService
  ) { }
  
  ngOnInit() { 
    this.holdDataService.getMessage().subscribe((msgObj: any) => {
      console.log('msg', msgObj.msg);
      this.message = msgObj.msg;
      if(msgObj.sucsess){
         this.className = 'alertgreen';
      }else{
         this.className = 'alertred';
      }
     
       setTimeout(() => {
             this.message = '';
            }, 8000);
   });

  this.isLocalStorage();
}

  closeMeg(){
    this.message = "";
  }

  isLocalStorage(){
 // var isLocalStoragevar = false;
  	try {
		localStorage.setItem('test', 'test');
		localStorage.removeItem('test');
	//	return true;
} catch (exception) {

  this.holdDataService.setMessage({msg: 'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.', sucsess: false});

   // alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
	//	return false;
	}
  }

  addLoc() {
    this.router.navigate(['/add-location']);
  }
}
