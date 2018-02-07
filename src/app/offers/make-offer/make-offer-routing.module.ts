import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeOfferComponent } from './make-offer.component';

const routes: Routes = [
  { path: '',    component: MakeOfferComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeOfferRoutingModule { }
