import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
// import { MzButtonModule, MzInputModule } from 'ngx-materialize';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {BrowserModule} from '@angular/platform-browser';
import { ImageComponent } from './image/image.component';
import { MaterialsModule } from './utils/materials.module';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { P404Component } from './p404/p404.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegistrationKeyComponent } from './registration-key/registration-key.component';
import { RegistrationKeyModalComponent } from './registration-key/registration-key-modal/registration-key-modal.component';
@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      NgxPaginationModule,
      ReactiveFormsModule,
      // MzButtonModule,
      // MzInputModule,
      // FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpModule,
      HttpClientModule,
      AuthenticationModule,
    ComponentsModule,
      SweetAlert2Module.forRoot(),
      MaterialsModule,
      ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'}),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
      AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ImageComponent,
    P404Component,
    RegistrationKeyModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
