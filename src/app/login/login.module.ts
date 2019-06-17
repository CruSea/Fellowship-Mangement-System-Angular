import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AuthenticationService } from '../services/authentication/authentication.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
      HttpClientModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
    providers: [AuthService, AuthenticationService]
})
export class LoginModule { }
