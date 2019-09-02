import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../utils/materials.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingService } from '../services/setting/setting.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
import { StorageService } from '../services/storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      ConfirmationPopoverModule,
      HttpClientModule,
      SweetAlert2Module,
      NgxPaginationModule,
      SettingsRoutingModule
  ],
  declarations: [SettingsComponent],
    providers: [SettingService, SmsPortService, StorageService],
    entryComponents: [SettingsComponent]
})
export class SettingsModule { }
