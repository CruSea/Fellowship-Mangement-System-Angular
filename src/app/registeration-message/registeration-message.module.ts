import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterationMessageComponent } from './registeration-message.component';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { MaterialsModule } from '../utils/materials.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { RegisterationMessageRoutingModule } from './registeration-message-routing.module';
import { StorageService } from '../services/storage.service';
import { RegisterationMessageService } from '../services/registeration-message/registeration-message.service';
import { RegistrationMessageGroupModalComponent } from './registration-message-group-modal/registration-message-group-modal.component';
import { RegistrationMessageContactModalComponent } from './registration-message-contact-modal/registration-message-contact-modal.component';
import { RegistrationMessageEventModalComponent } from './registration-message-event-modal/registration-message-event-modal.component';
import { RegistrationMessageFellowModalComponent } from './registration-message-fellow-modal/registration-message-fellow-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgPipesModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      MaterialsModule,
      ConfirmationPopoverModule,
      HttpClientModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      Ng2SmartTableModule,
      RegisterationMessageRoutingModule
  ],
  declarations: [RegisterationMessageComponent, RegistrationMessageGroupModalComponent, RegistrationMessageContactModalComponent, RegistrationMessageEventModalComponent, RegistrationMessageFellowModalComponent],
    providers: [StorageService, RegisterationMessageService],
    entryComponents: [RegistrationMessageGroupModalComponent, RegistrationMessageContactModalComponent, RegistrationMessageEventModalComponent, RegistrationMessageFellowModalComponent]
})
export class RegisterationMessageModule { }
