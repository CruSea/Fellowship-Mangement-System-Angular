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

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      MaterialsModule,
      HttpClientModule,
      ConfirmationPopoverModule,
      ReactiveFormsModule,
      PostGraduatesRoutingModule
  ],
  declarations: [PostGraduatesComponent],
    providers: [PostGraduatesService, StorageService]
})
export class PostGraduatesModule { }
