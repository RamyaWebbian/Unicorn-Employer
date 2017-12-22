import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';
import { EditHwaComponent } from './edit-hwa.component';
import { EditHwaRoutingModule } from './edit-hwa-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderValidUserModule,
    EditHwaRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditHwaComponent]
})
export class EditHwaModule { }
