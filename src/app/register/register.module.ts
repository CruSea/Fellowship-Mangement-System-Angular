import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule} from './register-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
      MaterialsModule,
    RegisterRoutingModule
  ],
    providers: [AuthService]
})
export class RegisterModule { }
