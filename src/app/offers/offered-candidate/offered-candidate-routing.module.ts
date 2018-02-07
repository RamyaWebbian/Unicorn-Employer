import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferedCandidateComponent } from './offered-candidate.component';

const routes: Routes = [
  { path: '',    component: OfferedCandidateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferedCandidateRoutingModule { }
