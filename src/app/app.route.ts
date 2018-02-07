import { Routes, provideRoutes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HelpModalComponent } from './common/help-modal/help-modal.component';
import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';
import { AuthGuard } from './user/guards/index';
import {DraftHwaModule} from './hwa/draft/draft-hwa.module';

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
        path: 'registration-success/:name',
        loadChildren: './user/registration-success/registration-success.module#RegistrationSuccessModule',
        pathMatch: 'full'
   },
   {
        path: 'pass/reset/:token/:uid/:isonetime',
        //path: 'set-new-password',
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
        path: 'add-location/:lid',
        loadChildren: './profile/add-location/add-location.module#AddLocationModule',
        pathMatch: 'full',
        canActivate: [AuthGuard]
   },

 /* {
      path: 'add-new-location',
      loadChildren: './profile/add-new-location/add-new-location.module#AddNewLocationModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   }, */
   {
      path: 'business-profile/:bId/:topicId',
      loadChildren: './profile/business-profile/business-profile.module#BusinessProfileModule',
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
      path: 'view-business-profile/:pId',
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
    {
      path: 'post-hwa',
      loadChildren: './posthwa/post-hwa.module#PostHwaModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'landing-page', /* Ramya */
      loadChildren: './hwa/landing-page/landing-page.module#LandingPageModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
  },
   {
      path: 'landing-page/:frmpaypal', /* Ramya */
      loadChildren: './hwa/landing-page/landing-page.module#LandingPageModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'hwa-basic-info',
      loadChildren: './hwa/create/hwa-basic-info/hwa-basic-info.module#HwaBasicInfoModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
    {
      path: 'all-hwa-list',
      loadChildren: './hwa/hwa-listing/hwa-listing.module#HwaListingModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'copy-hwa',
      loadChildren: './hwa/copy/copy-hwa.module#CopyHwaModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'extend-hwa',
      loadChildren: './hwa/extend/extend-hwa.module#ExtendHwaModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
   {
      path: 'hwa-preview',
      loadChildren: './hwa/hwa-preview/hwa-preview.module#HwaPreviewModule',
      pathMatch: 'full',
      canActivate: [AuthGuard]
   },
  {
    path: 'active-ad',
    loadChildren: './all-applicants/active-ad/active-ad.module#ActiveAdModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'applicants-list/:hwaName/:hwaId/:hwaAuthor',
    loadChildren: './all-applicants/applicants-list/applicants-list.module#ApplicantsListModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'interview-status/:hwaid/:hwaauthor/:applicantid/:status/:status2',
    loadChildren: './all-applicants/operations/track-accept/track-accept.module#TrackAcceptModule',
    pathMatch: 'full'
  },
  {
    path: 'view-applicant/:hwaName/:hwaId/:applicantId/:hwaAuthor',
    loadChildren: './all-applicants/view-applicant/view-applicant.module#ViewApplicantModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'schedule-interview/:hwaName/:hwaId/:applicantName/:applicantId',
    loadChildren: './all-applicants/operations/schedule-interview/schedule-interview.module#ScheduleInterviewModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'simple-notes',
    loadChildren: './all-applicants/operations/simple-notes/simple-notes.module#SimpleNotesModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'positive-notes',
    loadChildren: './all-applicants/operations/interview-notes/positive-notes/positive-notes.module#PositiveNotesModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'negative-notes',
    loadChildren: './all-applicants/operations/interview-notes/negative-notes/negative-notes.module#NegativeNotesModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'candidate-list/:hwaName/:hwaId/:hwaAuthor',
    loadChildren: './interview/candidate-list/candidate-list.module#CandidateListModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'interviewed-list',
    loadChildren: './interview/interviewed-list/interviewed-list.module#InterviewedListModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'make-offer/:hwaId/:applicantId/:empId/:position',
    loadChildren: './offers/make-offer/make-offer.module#MakeOfferModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'offered-candidate-list/:hwaName/:hwaId', /* Ramya */
    loadChildren: './offers/offered-candidate/offered-candidate.module#OfferedCandidateModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'offered-hwa-list',
    loadChildren: './offers/offered-hwa-list/offered-hwa-list.module#OfferedHwaListModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'offer-status/:hwaid/:hwaauthor/:applicantid/:status',
    loadChildren: './offers/track-offer/track-offer.module#TrackOfferModule',
    pathMatch: 'full'
  },
  {
    path: 'view-resume/:url',
    loadChildren: './all-applicants/operations/view-resume/view-resume.module#ViewResumeModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'active/:hwa_id',
    loadChildren: './active-hwa/active-hwa.module#ActiveHwaModule',
    pathMatch: 'full'
  },
  {
    path: 'active/:hwa_id/:locationId',
    loadChildren: './active-hwa/active-hwa.module#ActiveHwaModule',
    pathMatch: 'full'
  },
  {
    path: 'draft/:uid/:hwaId',
    loadChildren: './hwa/draft/draft-hwa.module#DraftHwaModule',
    pathMatch: 'full'
  },
     { path: '**', component: PagenotfoundComponent }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router);
