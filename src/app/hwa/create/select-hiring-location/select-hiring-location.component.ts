import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/index';

@Component({
  selector: 'app-select-hiring-location',
  templateUrl: './select-hiring-location.component.html',
  styleUrls: ['./select-hiring-location.component.css']
})
export class SelectHiringLocationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
