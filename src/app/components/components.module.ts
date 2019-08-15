import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialsModule } from '../utils/materials.module';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { StorageService } from '../services/storage.service';
import { UserProfileService } from '../services/user-profile/user-profile.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
      MaterialsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
    providers: [
        AuthenticationService, StorageService, UserProfileService
    ]
})
export class ComponentsModule { }
