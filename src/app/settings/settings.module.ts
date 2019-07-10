import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../utils/materials.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingService } from '../services/setting/setting.service';
import { StorageService } from '../services/storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialsModule,
      HttpClientModule,
      SweetAlert2Module,
      SettingsRoutingModule
  ],
  declarations: [SettingsComponent],
    providers: [SettingService, StorageService],
    entryComponents: [SettingsComponent]
})
export class SettingsModule { }
