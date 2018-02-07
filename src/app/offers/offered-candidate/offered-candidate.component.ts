import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AllApplicantServicesService} from '../../all-applicants/services/all-applicant-services.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-offered-candidate',
  templateUrl: './offered-candidate.component.html',
  styleUrls: ['./offered-candidate.component.css','../../all-applicants/all-applicants.css']
})
export class OfferedCandidateComponent implements OnInit {
  public hwaId;
  public hwaName;
  public listOfGoodtoOffer;
  public listOfOffered;
  public pageLoded;
  public offerAccepted = [];
  public offeredApplicant  = [];
  public offerRejected  = [];
  constructor(private services: AllApplicantServicesService, private router: Router, private userservice: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hwaId = params['hwaId'];
      this.hwaName = params['hwaName'];
      // viewapplicant/:hwaName/:hwaId/:applicantId/:hwaAuthor/:status
    });
    this.fetchList();
  }
  viewApplicant(applicantID, status) {
    const user = this.userservice.isLogedin();
    const empId = user.uid;
    this.router.navigate(['view-applicant', this.hwaName, this.hwaId, applicantID, empId]);
  }
  fetchList() {
    const hwaId = {
      'hwa_id': this.hwaId,
      'offer_status': '27,23,28,29'
    };
    this.services.reciterOfferList(hwaId).subscribe(
      res => {
        console.log(res)
        this.listOfGoodtoOffer = res.offer_list['good-to-offer'];
        this.listOfOffered = res.offer_list['offered'];
        this.offerAccepted = res.offer_list['offer-accepted'];
        this.offerRejected = res.offer_list['offer-declined'];
       this.offeredApplicant = this.offeredApplicant.concat(this.offerAccepted, res.offer_list['offered'], this.offerRejected);
        console.log(this.offeredApplicant)
        this.pageLoded = true;
      }
    );
  }
  goToOffer(applicantId) {
    const user = this.userservice.isLogedin();
    const empId = user.uid;
    this.router.navigate(['make-offer', this.hwaId, applicantId, empId]);
  }
  humanReadableTime(timestamp) {
    return new Date(timestamp * 1000);
  }
}

