import { Routes, provideRoutes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HelpModalComponent } from './common/help-modal/help-modal.component';
import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';
import { AuthGuard } from './user/guards/index';

export const router: Routes = [
   {  path: '',
      redirectTo: '/user-profile',
      pathMatch: 'full'
  },
  {
        path: 'login',
        loadChildren: './user/login/login.module#LoginModule',
        pathMatch: 'full'
  },
  {
        path: 'registration',
        loadChildren: './user/registration/registration.module#RegistrationModule',
        pathMatch: 'full'
  },
  {
        path: 'forgot-password',
        loadChildren: './user/forgot-password/forgot-password.module#ForgotPasswordModule',
        pathMatch: 'full'
  },
  {
        path: 'forgot-success',
        loadChildren: './user/forgot-success/forgot-success.module#ForgotSuccessModule',
        pathMatch: 'full'
  },
  {
        path: 'registration-success',
        loadChildren: './user/registration-success/registration-success.module#RegistrationSuccessModule',
        pathMatch: 'full'
   },
   {
        path: 'pass/reset/:token/:uid/:isonetime',
        loadChildren: './user/set-new-password/set-new-password.module#SetNewPasswordModule',
        pathMatch: 'full'
   },
   {
        path: 'user-profile',
        loadChildren: './profile/user-profile/user-profile.module#UserProfileModule',
        pathMatch: 'full',
        canActivate: [AuthGuard]
   },
    {
        path: 'user-profile-view',
        loadChildren: './profile/user-profile-view/user-profile-view.module#UserProfileViewModule',
        pathMatch: 'full',
        canActivate: [AuthGuard]
   },
   {
        path: 'add-location',
        loadChildren: './profile/add-location/add-location.module#AddLocationModule',
        pathMatch: 'full',
        canActivate: [AuthGuard]
   },
  
   {
      path: 'add-new-location',
      loadChildren: './profile/add-new-location/add-new-location.module#AddNewLocationModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'business-profile',
      loadChildren: './profile/business-profile/business-profile.module#BusinessProfileModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'view-business-profile',
      loadChildren: './profile/view-business-profile/view-business-profile.module#ViewBusinessProfileModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'header-registration',
      loadChildren: './common/header-registration/header-registration.module#HeaderRegistrationModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
     { path: '**', component: PagenotfoundComponent }
];

export const appRouter : ModuleWithProviders = RouterModule.forRoot(router);
