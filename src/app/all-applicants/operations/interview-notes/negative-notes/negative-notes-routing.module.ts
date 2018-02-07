import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegativeNotesComponent } from './negative-notes.component';

const routes: Routes = [
  { path: '',    component: NegativeNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegativeNotesRoutingModule { }
