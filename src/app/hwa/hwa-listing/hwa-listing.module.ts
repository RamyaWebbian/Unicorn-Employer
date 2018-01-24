import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HwaListingComponent } from './hwa-listing.component';
import { HwaListingRoutingModule } from './hwa-listing-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {HeaderValidUserModule} from '../../common/header-valid-user/header-valid-user.module';
import { UserService, HwaCommonService } from '../../services/index';
@NgModule({
  imports: [
    CommonModule,
    HwaListingRoutingModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [HwaListingComponent],
  providers: [HwaCommonService]
})

export class HwaListingModule { }
