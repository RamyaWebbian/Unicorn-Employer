import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-extend-hwa',
  templateUrl: './extend-hwa.component.html',
  styleUrls: ['./extend-hwa.component.css']
})
export class ExtendHwaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
