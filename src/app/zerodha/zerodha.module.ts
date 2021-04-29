import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { ZerodhaRoutingModule } from './zerodha-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// Import library module
// import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    ZerodhaRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ZerodhaModule { }
