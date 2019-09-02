import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationKeyComponent } from '../registration-key.component';
import { StorageService } from '../../services/storage.service';
import { RegistrationKeyService } from '../../services/registration-key/registration-key.service';
import { MaterialsModule } from '../../utils/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { RegistrationKeyRoutingModule } from '../registration-key-routing/registration-key-routing.module';
// import { EventsModalComponent } from './events-modal/events-modal.component';
// import { UpdateEventsComponent } from './update-events/update-events.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';




@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      HttpClientModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      ConfirmationPopoverModule,
      RegistrationKeyRoutingModule,
  ],
  declarations: [RegistrationKeyComponent],
  providers: [StorageService, RegistrationKeyService],
  // entryComponents: [EventsModalComponent, UpdateEventsComponent]
})

export class RegistrationKeyModuleModule { }
