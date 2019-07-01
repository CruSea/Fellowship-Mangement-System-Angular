import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupContactsComponent } from './group-contacts.component';
import { GroupContactsRoutingModule } from './group-contacts-routing.module';
import { GroupContactsModalComponent } from './group-contacts-modal/group-contacts-modal.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { TeamService } from '../services/team/team.service';
import { StorageService } from '../services/storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      HttpClientModule,
      ReactiveFormsModule,
      GroupContactsRoutingModule
  ],
  declarations: [GroupContactsComponent, GroupContactsModalComponent, UpdateContactComponent],
    providers: [TeamService, StorageService],
    entryComponents: [GroupContactsModalComponent, UpdateContactComponent]
})
export class GroupContactsModule { }
