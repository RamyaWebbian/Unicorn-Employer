import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewedListComponent } from './interviewed-list.component';

const routes: Routes = [
  { path: '',    component: InterviewedListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewedListRoutingModule { }
