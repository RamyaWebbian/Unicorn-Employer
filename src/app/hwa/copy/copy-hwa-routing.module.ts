import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyHwaComponent } from './copy-hwa.component';

const routes: Routes = [
  { path: '',    component: CopyHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyHwaRoutingModule { }
