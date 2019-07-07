import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { SentMessagesService } from '../services/sent_messages/sent-messages.service';
import { NgPipesModule } from 'ngx-pipes';
import { SmsPortService } from '../services/sms-port/sms-port.service';
@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgPipesModule,
      MaterialsModule,
      HttpClientModule,
      ReactiveFormsModule,
      MessagesRoutingModule,
      Ng2SmartTableModule
  ],
  declarations: [MessagesComponent, MessageModalComponent],
    providers: [ SentMessagesService, StorageService, SmsPortService],
    entryComponents: [MessageModalComponent]
})
export class MessagesModule { }
