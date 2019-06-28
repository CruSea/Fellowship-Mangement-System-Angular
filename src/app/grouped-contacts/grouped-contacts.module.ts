import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupedContactsComponent } from './grouped-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { GroupedContactsRoutingModule } from './grouped-contacts-routing.module';
import { StorageService } from '../services/storage.service';
import { TeamService } from '../services/team/team.service';
import { GroupedContactsModalComponent } from './grouped-contacts-modal/grouped-contacts-modal.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ReactiveFormsModule,
      GroupedContactsRoutingModule
  ],
  declarations: [GroupedContactsComponent, GroupedContactsModalComponent],
    providers: [StorageService, TeamService],
    // entryComponents: [G]
})
export class GroupedContactsModule { }
