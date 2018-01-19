import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { appRouter } from './app.route';
import { ShowHideInput } from '../app/common/directives/show-hide-directive';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './user/guards/index';
import { UserService, ProfileService, HoldDataService } from './services/index';
import { CookieService } from 'ngx-cookie-service';
 import {SimpleNotificationsModule} from 'angular2-notifications';
 import {NotificationsService} from 'angular2-notifications';
 import { SharedServiceModule } from './shared/sharedService.module';
 //import { HeaderRegistrationModule } from './common/header-registration/header-registration.module';
// import { HeaderValidUserComponent } from './common/header-valid-user/header-valid-user.component';
// import { EqualValidator } from './common/directives/equal-validator.directive';
// import { HelpModalModule } from './help-modal/help-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
   // HeaderRegistrationComponent,
   // HeaderValidUserComponent,
    //EqualValidator
    ],
  imports: [
    BrowserModule,
    // SharedModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    appRouter,
    SimpleNotificationsModule,
    SharedServiceModule.forRoot()
  ],
    // exports: [RouterModule],
  providers: [AuthGuard, UserService, CookieService,
  NotificationsService, ProfileService, HoldDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
