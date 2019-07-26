import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodicMessageComponent } from './periodic-message.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodicMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicMessageRoutingModule { }
