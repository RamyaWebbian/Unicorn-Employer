import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DraftHwaComponent } from './draft-hwa.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/index';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
import {DraftHwaRoutingModule} from './draft-hwa-routing.module';
import {HwaCommonService} from '../../services';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DraftHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
    NgxEditorModule
  ],
  declarations: [DraftHwaComponent],
  providers: [HwaCommonService]
})

export class DraftHwaModule { }
