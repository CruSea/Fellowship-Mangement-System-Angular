import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { StorageService } from '../services/storage.service';
import { EventsService } from '../services/events/events.service';
import { MaterialsModule } from '../utils/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { EventsModalComponent } from './events-modal/events-modal.component';
import { UpdateEventsComponent } from './update-events/update-events.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      HttpClientModule,
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      EventsRoutingModule
  ],
  declarations: [EventsComponent, EventsModalComponent, UpdateEventsComponent],
    providers: [StorageService, EventsService],
    entryComponents: [EventsModalComponent, UpdateEventsComponent]
})
export class EventsModule { }
