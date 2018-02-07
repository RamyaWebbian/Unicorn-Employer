import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import { DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css', '../../all-applicants.css']
})
export class ViewResumeComponent implements OnInit  {
  public resumeUrl: SafeUrl;
  public getValue;
  public getFull;
  public uri;
  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //
    this.activatedRoute.params.subscribe((params: Params) => {
      const applicantId = params['url'];
      this.uri = applicantId;
    });
    this.getValue = this.uri;
    this.getFull = 'https://docs.google.com/viewerng/viewer?url=' + this.getValue + '&embedded=true';
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getFull);
  }

  goBack() {
    history.back();
  }

}

