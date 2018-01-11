import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent implements OnInit {
public userName:string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
       this.activatedRoute.params.subscribe(
      (param: any) => {
        // console.log(param['isonetime']);
        if (param['name'] ) {
         this.userName = param['name'];
        }
      });
  }

}
