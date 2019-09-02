import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { GroupMessagesComponent } from './group-messages.component';
import { GroupMessagesRoutingModule } from './group-messages-routing.module';
import { GroupMessagesModalComponent } from './group-messages-modal/group-messages-modal.component';
import { GroupedMessageService } from '../services/group_message/grouped-message.service';
import { StorageService } from '../services/storage.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { GroupMessageFellowshipModalComponent } from './group-message-fellowship-modal/group-message-fellowship-modal.component';
import { GroupMessagePostgraduatesModalComponent } from './group-message-postgraduates-modal/group-message-postgraduates-modal.component';
import { GroupMessagePostgraduatesContactModalComponent } from './group-message-postgraduates-contact-modal/group-message-postgraduates-contact-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GroupMessageService } from './group-message.service';
import { GroupMessageEventModalComponent } from './group-message-event-modal/group-message-event-modal.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
        ConfirmationPopoverModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        GroupMessagesRoutingModule,
        Ng2SmartTableModule
    ],
    declarations: [GroupMessagesComponent, GroupMessagesModalComponent, GroupMessageFellowshipModalComponent,
        GroupMessagePostgraduatesModalComponent, GroupMessagePostgraduatesContactModalComponent, GroupMessageEventModalComponent],
    providers: [ GroupedMessageService, StorageService, GroupMessageService],
    entryComponents: [GroupMessagesModalComponent, GroupMessageFellowshipModalComponent,
        GroupMessagePostgraduatesModalComponent, GroupMessagePostgraduatesContactModalComponent, GroupMessageEventModalComponent]
})
export class GroupMessagesModule { }
