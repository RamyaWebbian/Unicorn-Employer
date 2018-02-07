import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateListComponent } from './candidate-list.component';

const routes: Routes = [
  { path: '',    component: CandidateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateListRoutingModule { }
