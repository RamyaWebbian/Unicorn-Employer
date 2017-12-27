import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/index';
import {NotificationsService} from 'angular2-notifications';

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

  constructor(
  private router : Router,
  private userService:UserService,
  private _notificationsService: NotificationsService
  ) { }
  
  ngOnInit() {
  this.isLocalStorage();
  }

  isLocalStorage(){
 // var isLocalStoragevar = false;
  	try {
		localStorage.setItem('test', 'test');
		localStorage.removeItem('test');
	//	return true;
} catch (exception) {
    this._notificationsService.warn(
          'Warning',
          'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
          });

   // alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
	//	return false;
	}
  }

  addLoc() {
    this.router.navigate(['/add-location']);
  }
}
