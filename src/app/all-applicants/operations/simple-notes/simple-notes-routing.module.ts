import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleNotesComponent } from './simple-notes.component';

const routes: Routes = [
  { path: '',    component: SimpleNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleNotesRoutingModule { }
