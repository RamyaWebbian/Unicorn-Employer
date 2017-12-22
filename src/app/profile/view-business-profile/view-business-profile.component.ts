import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    this.router.navigate(['/business-profile']);
  }
  helpText(){
    
  }
}
