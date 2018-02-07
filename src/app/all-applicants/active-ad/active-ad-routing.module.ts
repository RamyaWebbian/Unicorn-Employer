import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveAdComponent } from './active-ad.component';

const routes: Routes = [
  { path: '',    component: ActiveAdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveAdRoutingModule { }
