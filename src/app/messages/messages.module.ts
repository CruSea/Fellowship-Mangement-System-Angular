import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessageModalComponent } from './message-modal/message-modal.component';
@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ReactiveFormsModule,
      MessagesRoutingModule,
      Ng2SmartTableModule
  ],
  declarations: [MessagesComponent, MessageModalComponent],
    entryComponents: [MessageModalComponent]
})
export class MessagesModule { }
