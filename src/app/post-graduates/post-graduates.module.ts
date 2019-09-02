import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGraduatesComponent } from './post-graduates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { PostGraduatesRoutingModule } from './post-graduates-routing.module';
import { PostGraduatesService } from '../services/post-graduates/post-graduates.service';
import { StorageService } from '../services/storage.service';
import { PostGraduatesModalComponent } from './post-graduates-modal/post-graduates-modal.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      HttpClientModule,
      ConfirmationPopoverModule,
      NgxPaginationModule,
      ReactiveFormsModule,
      PostGraduatesRoutingModule
  ],
  declarations: [PostGraduatesComponent, PostGraduatesModalComponent],
    providers: [PostGraduatesService, StorageService],
    entryComponents: [PostGraduatesModalComponent]
})
export class PostGraduatesModule { }
