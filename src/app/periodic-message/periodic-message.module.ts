import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicMessageComponent } from './periodic-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MaterialsModule } from '../utils/materials.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { PeriodicMessageRoutingModule } from './periodic-message-routing.module';
import { PeriodicMessageService } from '../services/periodic-message/periodic-message.service';
import { StorageService } from '../services/storage.service';
import { PeriodicMessageModalComponent } from './periodic-message-modal/periodic-message-modal.component';
import { SmsPortService } from '../services/sms-port/sms-port.service';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgPipesModule,
      MaterialsModule,
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      Ng2SmartTableModule,
      PeriodicMessageRoutingModule
  ],
  declarations: [PeriodicMessageComponent, PeriodicMessageModalComponent],
    providers: [ PeriodicMessageService, StorageService, SmsPortService],
    entryComponents: [PeriodicMessageModalComponent]
})
export class PeriodicMessageModule { }
