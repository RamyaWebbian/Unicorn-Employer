import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectHiringLocationComponent } from './select-hiring-location.component';

const routes: Routes = [
  { path: '',    component: SelectHiringLocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectHiringLocationRoutingModule { }
