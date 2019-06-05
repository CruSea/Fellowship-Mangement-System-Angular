import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { GroupMessagesComponent } from './group-messages.component';
import { GroupMessagesRoutingModule } from './group-messages-routing.module';
import { GroupMessagesModalComponent } from './group-messages-modal/group-messages-modal.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        ReactiveFormsModule,
        GroupMessagesRoutingModule,
        Ng2SmartTableModule
    ],
    declarations: [GroupMessagesComponent, GroupMessagesModalComponent],
    entryComponents: [GroupMessagesModalComponent]
})
export class GroupMessagesModule { }
