import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationKeyComponent } from '../registration-key.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationKeyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegistrationKeyRoutingModule { }
