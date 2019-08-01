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
import { PeriodicMessageEventModalComponent } from './periodic-message-event-modal/periodic-message-event-modal.component';
import { PeriodicMessageContactsModalComponent } from './periodic-message-contacts-modal/periodic-message-contacts-modal.component';
import { PeriodicMessageFellowModalComponent } from './periodic-message-fellow-modal/periodic-message-fellow-modal.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgPipesModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      Ng2SmartTableModule,
      PeriodicMessageRoutingModule
  ],
  declarations: [PeriodicMessageComponent, PeriodicMessageModalComponent, PeriodicMessageEventModalComponent, PeriodicMessageContactsModalComponent, PeriodicMessageFellowModalComponent],
    providers: [ PeriodicMessageService, StorageService, SmsPortService],
    entryComponents: [PeriodicMessageModalComponent, PeriodicMessageContactsModalComponent, PeriodicMessageEventModalComponent]
})
export class PeriodicMessageModule { }
