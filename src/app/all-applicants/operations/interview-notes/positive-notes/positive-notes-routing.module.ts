import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositiveNotesComponent } from './positive-notes.component';

const routes: Routes = [
  { path: '',    component: PositiveNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositiveNotesRoutingModule { }
