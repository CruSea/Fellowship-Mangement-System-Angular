import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        // canActivate: [ ProtectedGuard ],
        children: [
            {
              path: '',
              loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }
        ]
    },
    {
        path: 'login',
        canActivate: [ PublicGuard ],
        loadChildren: './login/login.module#LoginModule',
    },
    {
        path: 'register',
        canActivate: [ PublicGuard ],
        loadChildren: './register/register.module#RegisterModule'
    },
    {
        path: '**',
        component: P404Component
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ],
})
export class AppRoutingModule { }
