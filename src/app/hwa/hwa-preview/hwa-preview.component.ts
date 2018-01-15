import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-hwa-preview',
  templateUrl: './hwa-preview.component.html',
  styleUrls: ['./hwa-preview.component.css','../only-hwa.css']
})
export class HwaPreviewComponent implements OnInit {
  public userInfo:FormGroup;
  firstName = new FormControl("", Validators.required);
    
  constructor(fb: FormBuilder,
    private router: Router) {
      this.userInfo = fb.group({
          "firstName": this.firstName,
          "password":["", Validators.required],
          "position": ["", Validators.required],
          "noOfPos": ["", Validators.required],
          "exp": ["", Validators.required],
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.userInfo.valid) {
      console.log("Form Submitted!");
    }
  }
}
