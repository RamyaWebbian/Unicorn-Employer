import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HwaBasicInfoComponent } from './hwa-basic-info.component';

const routes: Routes = [
  { path: '',    component: HwaBasicInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HwaBasicInfoRoutingModule { }
