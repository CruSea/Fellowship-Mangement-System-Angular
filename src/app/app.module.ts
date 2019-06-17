import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
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

@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
      HttpClientModule,
      AuthenticationModule,
    ComponentsModule,
      MaterialsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
      AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ImageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
