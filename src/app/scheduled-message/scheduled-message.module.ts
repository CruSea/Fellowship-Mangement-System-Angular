import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledMessageComponent } from './scheduled-message.component';
import { ScheduledMessageModalComponent } from './scheduled-message-modal/scheduled-message-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MaterialsModule } from '../utils/materials.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { ScheduledMessageRoutingModule } from './scheduled-message-routing.module';
import { ScheduledMessageService } from '../services/scheduled-message/scheduled-message.service';
import { StorageService } from '../services/storage.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgPipesModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      MaterialsModule,
      ConfirmationPopoverModule,
      HttpClientModule,
      ReactiveFormsModule,
      Ng2SmartTableModule,
      ScheduledMessageRoutingModule
  ],
  declarations: [ScheduledMessageComponent, ScheduledMessageModalComponent ],
    providers: [ ScheduledMessageService, StorageService, SmsPortService],
    entryComponents: [ ScheduledMessageModalComponent ]
})
export class ScheduledMessageModule { }
