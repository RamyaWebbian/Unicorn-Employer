import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackAcceptComponent } from './track-accept.component';

const routes: Routes = [
  { path: '',    component: TrackAcceptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackAcceptRoutingModule { }
