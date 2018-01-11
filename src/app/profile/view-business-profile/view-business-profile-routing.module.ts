import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewBusinessProfileComponent } from './view-business-profile.component';

const routes: Routes = [
  { path: '',    component: ViewBusinessProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBusinessProfileRoutingModule { }
