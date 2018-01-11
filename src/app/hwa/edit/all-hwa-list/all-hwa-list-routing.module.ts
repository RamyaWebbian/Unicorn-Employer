import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllHwaListComponent } from './all-hwa-list.component';

const routes: Routes = [
  { path: '',    component: AllHwaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllHwaListRoutingModule { }
