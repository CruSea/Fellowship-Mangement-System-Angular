import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { ReceivedMessagesComponent } from './received-messages.component';
import { ReceivedMessagesRoutingModule } from './received-messages-routing.module';
import { NgPipesModule } from 'ngx-pipes';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { StorageService } from '../services/storage.service';
import { ReceivedMessagesService } from '../services/received-messages/received-messages.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgPipesModule,
        MaterialsModule,
        ConfirmationPopoverModule,
        HttpClientModule,
        ReceivedMessagesRoutingModule,
        ReactiveFormsModule,
        Ng2SmartTableModule
    ],
    declarations: [ReceivedMessagesComponent ],
    providers: [ StorageService, ReceivedMessagesService],
    entryComponents: []
})
export class ReceivedMessagesModule { }
