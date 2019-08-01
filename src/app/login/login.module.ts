import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
    HttpClientModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
    providers: [AuthenticationService]
})
export class LoginModule { }
