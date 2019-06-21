import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../utils/materials.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
      MaterialsModule,
      SettingsRoutingModule
  ],
  declarations: [SettingsComponent],
    providers: [],
    entryComponents: [SettingsComponent]
})
export class SettingsModule { }
