import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupContactsComponent } from './group-contacts.component';
import { GroupContactsRoutingModule } from './group-contacts-routing.module';
import { GroupContactsModalComponent } from './group-contacts-modal/group-contacts-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { TeamService } from '../services/team/team.service';
import { StorageService } from '../services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UpdateGroupContactsComponent } from './update-group-contacts/update-group-contacts.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ConfirmationPopoverModule,
      HttpClientModule,
      ReactiveFormsModule,
      GroupContactsRoutingModule
  ],
  declarations: [GroupContactsComponent, GroupContactsModalComponent, UpdateGroupContactsComponent],
    providers: [TeamService, StorageService],
    entryComponents: [GroupContactsModalComponent, UpdateGroupContactsComponent]
})
export class GroupContactsModule { }
