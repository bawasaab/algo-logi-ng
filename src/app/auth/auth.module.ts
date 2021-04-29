import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    SharedModule,
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgxSpinnerModule,
    AuthRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
