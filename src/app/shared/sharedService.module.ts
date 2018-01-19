import { NgModule, ModuleWithProviders } from '@angular/core';
import { HoldDataService } from '../services/hold-data.service'
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
      declarations: [
    ],
  imports: [
  CommonModule
  ],
    // exports: [RouterModule],
  providers: [ HoldDataService],
})
export class SharedServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServiceModule,
      providers: [HoldDataService]
    };
  }
}