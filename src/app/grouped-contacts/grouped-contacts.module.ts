import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupedContactsComponent } from './grouped-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { GroupedContactsRoutingModule } from './grouped-contacts-routing.module';
import { StorageService } from '../services/storage.service';
import { TeamService } from '../services/team/team.service';
import { GroupedContactsModalComponent } from './grouped-contacts-modal/grouped-contacts-modal.component';
import { GroupedContactsService } from '../services/grouped_contacts/grouped-contacts.service';
import { ImportGroupedContactsComponent } from './import-grouped-contacts/import-grouped-contacts.component';
import { ContactService } from '../services/contact/contact.service';
// import { UpdateGroupedContactsComponent } from './update-grouped-contacts/update-grouped-contacts.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ReactiveFormsModule,
      GroupedContactsRoutingModule
  ],
  declarations: [GroupedContactsComponent, GroupedContactsModalComponent, ImportGroupedContactsComponent],
    providers: [StorageService, TeamService, GroupedContactsService, ContactService],
    entryComponents: [GroupedContactsModalComponent]
})
export class GroupedContactsModule { }
