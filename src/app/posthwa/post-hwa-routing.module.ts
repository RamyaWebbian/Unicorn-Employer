import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { PostHwaComponent } from './post-hwa.component';

const routes: Routes = [
  { path: '',    component: PostHwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostHwaRoutingModule {}