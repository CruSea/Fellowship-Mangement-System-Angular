import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { UpdateContactComponent } from './update-contact/update-contact.component';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      ContactsRoutingModule,
      ReactiveFormsModule,
      Ng2SmartTableModule
  ],
  declarations: [ContactsComponent, ContactsModalComponent, UpdateContactComponent],
    entryComponents: [ ContactsModalComponent, UpdateContactComponent ]
})
export class ContactsModule { }
