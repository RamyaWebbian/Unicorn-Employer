import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-interviewed-list',
  templateUrl: './interviewed-list.component.html',
  styleUrls: ['./interviewed-list.component.css']
})
export class InterviewedListComponent implements OnInit {
  public listData;
  public hwaAuthor;
  public pageLoded;
  constructor(private services: AllApplicantServicesService, private router: Router, private userservice: UserService) { }

  ngOnInit() {
    this.fetchHwa();
  }
  // Fetch Hwa list
  fetchHwa() {
    const user = this.userservice.isLogedin();
    const empid = {'uid': user.uid }; 
    this.hwaAuthor = user.uid;
    this.services.interviewSummery(empid).subscribe(
      res => {
        this.listData = res;
        this.pageLoded = true;
        console.log(res);
        console.log("total is : "+res.length);
      }
    );  
    
  }



  goToapplicant(hwaId, hwaName) { // hwaName/:hwaId/:
    this.router.navigate(['/candidate-list', hwaName, hwaId, this.hwaAuthor]);
  }
}
