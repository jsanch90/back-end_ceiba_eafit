import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './services/user_service/user.service';
import { ServicesSettings } from './services/services_settings';
import { CommonDataService } from './services/common-data-service/common-data.service';
import { PvDeviceServiceService } from './services/pv_device_service/pv-device-service.service';
import { CeibaVarsService } from './services/ceiba_vars_service/ceiba-vars.service';

import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [UserService, ServicesSettings, CommonDataService, PvDeviceServiceService, CeibaVarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
