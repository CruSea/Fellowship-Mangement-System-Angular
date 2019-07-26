import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { StorageService } from '../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialsModule,
      HttpClientModule,
      SweetAlert2Module,
      UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent],
    providers: [UserProfileService, StorageService],
    entryComponents: [UserProfileComponent]
})
export class UserProfileModule { }
