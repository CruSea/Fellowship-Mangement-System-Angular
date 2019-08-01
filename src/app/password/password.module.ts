import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../utils/materials.module';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { PasswordRoutingModule } from './password-routing.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MaterialsModule,
      NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
      HttpClientModule,
      ReactiveFormsModule,
      PasswordRoutingModule
  ],
  declarations: [PasswordComponent]
})
export class PasswordModule { }
