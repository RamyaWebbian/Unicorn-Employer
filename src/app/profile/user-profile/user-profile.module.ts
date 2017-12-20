import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { HelpModalModule } from '../../common/help-modal/help-modal.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderValidUserModule } from '../../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    HelpModalModule,
    HeaderValidUserModule
    //SharedModule,
    
   /* RouterModule.forChild([
      {path:'',component:UserProfileComponent,pathMatch:'full'}
    ]) */
     
  ],
 // exports:[UserProfileComponent],
  declarations: [UserProfileComponent]
})
export class UserProfileModule {  }
