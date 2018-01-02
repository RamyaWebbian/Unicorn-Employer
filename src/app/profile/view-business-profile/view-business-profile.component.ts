import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-view-business-profile',
  templateUrl: './view-business-profile.component.html',
  styleUrls: ['./view-business-profile.component.css']
})
export class ViewBusinessProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addNewBusiness() {
    //this.router.navigate(['/business-profile']);
  }
  helpText(){
    
  }
}
