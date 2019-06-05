import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { ReceivedMessagesComponent } from './received-messages.component';
import { ReceivedMessagesRoutingModule } from './received-messages-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        ReactiveFormsModule,
        ReceivedMessagesRoutingModule
    ],
    declarations: [ReceivedMessagesComponent ],
    entryComponents: []
})
export class ReceivedMessagesModule { }
