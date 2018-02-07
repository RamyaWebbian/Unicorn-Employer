import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferedHwaListComponent } from './offered-hwa-list.component';

const routes: Routes = [
  { path: '',    component: OfferedHwaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferedHwaListRoutingModule { }
