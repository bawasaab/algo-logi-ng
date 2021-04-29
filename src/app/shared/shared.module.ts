import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NgxSpinnerModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
