import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantsListComponent } from './applicants-list.component';

const routes: Routes = [
  { path: '',    component: ApplicantsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantsListRoutingModule { }
