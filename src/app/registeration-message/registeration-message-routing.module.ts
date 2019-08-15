import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterationMessageComponent } from './registeration-message.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterationMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterationMessageRoutingModule { }
