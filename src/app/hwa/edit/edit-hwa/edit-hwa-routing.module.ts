import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditHwaComponent } from './edit-hwa.component';

import { Routes, RouterModule }        from '@angular/router';

const routes: Routes = [
  { path: '',    component: EditHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHwaRoutingModule { }
