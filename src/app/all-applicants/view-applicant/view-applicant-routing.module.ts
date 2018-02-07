import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewApplicantComponent } from './view-applicant.component';

const routes: Routes = [
  { path: '',    component: ViewApplicantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewApplicantRoutingModule { }
