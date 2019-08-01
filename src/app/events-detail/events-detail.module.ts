import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsDetailComponent } from './events-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EventsDetailRoutingModule } from './events-detail-routing.module';
import { StorageService } from '../services/storage.service';
import { EventsService } from '../services/events/events.service';
import { AssignMembersComponent } from './assign-members/assign-members.component';
import { EventsContactsModalComponent } from './events-contacts-modal/events-contacts-modal.component';
import { ImportEventsContactsComponent } from './import-events-contacts/import-events-contacts.component';
import { UpdateEventsContactsComponent } from './update-events-contacts/update-events-contacts.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      EventsDetailRoutingModule
  ],
  declarations: [EventsDetailComponent, AssignMembersComponent, EventsContactsModalComponent, ImportEventsContactsComponent, UpdateEventsContactsComponent],
    providers: [StorageService, EventsService]
})
export class EventsDetailModule { }
