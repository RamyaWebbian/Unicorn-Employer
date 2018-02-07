import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-offered-hwa-list',
  templateUrl: './offered-hwa-list.component.html',
  styleUrls: ['./offered-hwa-list.component.css']
})
export class OfferedHwaListComponent implements OnInit {
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
    this.services.offerSummery(empid).subscribe(
      res => {
        this.listData = res;
        console.log(res);
        this.pageLoded = true;
      }
    );
  }
  goToapplicant(hwaId, hwaName) { // hwaName/:hwaId/:
    this.router.navigate(['/offered-candidate-list', hwaName, hwaId]);
  }

}
