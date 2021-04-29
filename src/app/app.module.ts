import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

import { SocketioService } from "./services/socketio.service";

import { DashboardComponent } from './zerodha/dashboard/dashboard.component';

// Import library module
// import { NgxSpinnerModule } from "ngx-spinner";
import { AuthModule } from './auth/auth.module';

import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    // HttpClientModule,
    AppRoutingModule,
    // NgxSpinnerModule,
    BrowserAnimationsModule,
    AuthModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
