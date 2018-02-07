import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveHwaComponent } from './active-hwa.component';

const routes: Routes = [
  { path: '',    component: ActiveHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveHwaRoutingModule { }
