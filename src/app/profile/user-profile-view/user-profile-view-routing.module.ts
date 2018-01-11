import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { UserProfileViewComponent }    from './user-profile-view.component';
 

const routes: Routes = [
  { path: '',    component: UserProfileViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileViewRoutingModule {}