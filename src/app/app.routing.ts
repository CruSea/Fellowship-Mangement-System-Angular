import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
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
