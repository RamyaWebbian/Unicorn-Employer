import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/index';

@Component({
  selector: 'app-hwa-basic-info',
  templateUrl: './hwa-basic-info.component.html',
  styleUrls: ['./hwa-basic-info.component.css']
})
export class HwaBasicInfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
