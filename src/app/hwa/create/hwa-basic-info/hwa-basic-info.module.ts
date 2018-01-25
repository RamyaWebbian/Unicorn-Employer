import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HwaBasicInfoComponent } from './hwa-basic-info.component';
import { HwaBasicInfoRoutingModule } from './hwa-basic-info-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { UserService, HwaCommonService } from '../../../services/index';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';
// import { QuillEditorModule } from 'ng2-quill-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HwaBasicInfoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
    //QuillEditorModule
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [HwaBasicInfoComponent],
  providers:[HwaCommonService]
})
//  {provide: HoldDataService, useValue: window.holdDataService}
export class HwaBasicInfoModule { }
