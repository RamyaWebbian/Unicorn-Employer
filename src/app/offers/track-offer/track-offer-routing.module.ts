import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackOfferComponent } from './track-offer.component';

const routes: Routes = [
  { path: '',    component: TrackOfferComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackOfferRoutingModule { }
