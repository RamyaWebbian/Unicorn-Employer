import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/index';

@Component({
  selector: 'app-all-hwa-list',
  templateUrl: './all-hwa-list.component.html',
  styleUrls: ['./all-hwa-list.component.css']
})
export class AllHwaListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
