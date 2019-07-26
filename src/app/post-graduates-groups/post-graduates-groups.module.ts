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

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      HttpClientModule,
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      PostGraduatesGroupsRoutingModule
  ],
  declarations: [PostGraduatesGroupsComponent],
    providers: [PostGraduatesGroupsService, StorageService]
})
export class PostGraduatesGroupsModule { }
