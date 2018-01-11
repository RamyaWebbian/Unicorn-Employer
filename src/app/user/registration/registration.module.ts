import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
 // import { HelpModalModule } from '../../common/help-modal/help-modal.module';
 //import {InputMaskDirective} from '../../common/directives/input-mask.directive';
 import { SharedModule } from '../../shared/shared.module';
 import { HeaderRegistrationModule } from '../../common/header-registration/header-registration.module';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/index';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RegistrationRoutingModule,
   // HelpModalModule,
    HeaderRegistrationModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [RegistrationComponent],
  providers:[CookieService, UserService]
})
export class RegistrationModule { }
