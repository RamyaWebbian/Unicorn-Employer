import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HwaPreviewComponent } from './hwa-preview.component';

const routes: Routes = [
  { path: '',    component: HwaPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HwaPreviewRoutingModule { }
