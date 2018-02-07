import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DraftHwaComponent } from './draft-hwa.component';

const routes: Routes = [
  { path: '',    component: DraftHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftHwaRoutingModule { }
