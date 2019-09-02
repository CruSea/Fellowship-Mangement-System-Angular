import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { ContactsService } from './contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../services/contact/contact.service';
import { StorageService } from '../services/storage.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      HttpClientModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      ConfirmationPopoverModule,
      NgxPaginationModule,
      ReactiveFormsModule,
      ContactsRoutingModule,
  ],
  declarations: [ContactsComponent, ContactsModalComponent, UpdateContactComponent, ImportContactComponent],
    providers: [ContactsService, ContactService, StorageService],
    entryComponents: [ ContactsModalComponent, UpdateContactComponent, ImportContactComponent ]
})
export class ContactsModule { }
