import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGraduatesGroupsComponent } from './post-graduates-groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { PostGraduatesGroupsRoutingModule } from './post-graduates-groups-routing.module';
import { StorageService } from '../services/storage.service';
import { PostGraduatesGroupsService } from '../services/post-graduates-groups/post-graduates-groups.service';
import { PostGraduatesGroupsModalComponent } from './post-graduates-groups-modal/post-graduates-groups-modal.component';
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
      ReactiveFormsModule,
      NgxPaginationModule,
      PostGraduatesGroupsRoutingModule
  ],
  declarations: [PostGraduatesGroupsComponent, PostGraduatesGroupsModalComponent],
    providers: [PostGraduatesGroupsService, StorageService],
    entryComponents: [PostGraduatesGroupsModalComponent]
})
export class PostGraduatesGroupsModule { }
