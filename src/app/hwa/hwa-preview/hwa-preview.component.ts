import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';
//import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-hwa-preview',
  templateUrl: './hwa-preview.component.html',
  styleUrls: ['./hwa-preview.component.css']
})
export class HwaPreviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
