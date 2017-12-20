import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { SetNewPasswordComponent }    from './set-new-password.component';

const routes: Routes = [
  { path: '',  component: SetNewPasswordComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetnewPasswordRoutingModule { }
