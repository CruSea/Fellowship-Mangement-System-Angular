import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ReactiveFormsModule,
      ContactsRoutingModule,
      Ng2SmartTableModule
  ],
  declarations: [ContactsComponent, ContactsModalComponent, UpdateContactComponent, ImportContactComponent],
    entryComponents: [ ContactsModalComponent, UpdateContactComponent, ImportContactComponent ]
})
export class ContactsModule { }
