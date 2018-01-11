import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-copy-hwa',
  templateUrl: './copy-hwa.component.html',
  styleUrls: ['./copy-hwa.component.css']
})
export class CopyHwaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
