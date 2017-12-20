import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/index';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-post-hwa',
  templateUrl: './post-hwa.component.html',
  styleUrls: ['./post-hwa.component.css']
})
export class PostHwaComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
