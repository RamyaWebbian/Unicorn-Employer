import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendHwaComponent } from './extend-hwa.component';

const routes: Routes = [
  { path: '',    component: ExtendHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendHwaRoutingModule { }
