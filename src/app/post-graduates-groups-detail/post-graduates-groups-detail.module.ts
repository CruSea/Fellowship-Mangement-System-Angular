import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGraduatesGroupsDetailComponent } from './post-graduates-groups-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { PostGraduatesGroupsDetailRoutingModule } from './post-graduates-groups-detail-routing.module';
import { StorageService } from '../services/storage.service';
import { PostGraduatesGroupsService } from '../services/post-graduates-groups/post-graduates-groups.service';
import { PostGraduatesGroupModalComponent } from './post-graduates-group-modal/post-graduates-group-modal.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { AssingPostGraduatesComponent } from './assing-post-graduates/assing-post-graduates.component';
import { UpdatePostGraduatesComponent } from './update-post-graduates/update-post-graduates.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      PostGraduatesGroupsDetailRoutingModule
  ],
  declarations: [PostGraduatesGroupsDetailComponent, PostGraduatesGroupModalComponent, AssingPostGraduatesComponent, UpdatePostGraduatesComponent],
    providers: [StorageService, PostGraduatesGroupsService],
    entryComponents: [PostGraduatesGroupModalComponent, AssingPostGraduatesComponent, UpdatePostGraduatesComponent]
})
export class PostGraduatesGroupsDetailModule { }
