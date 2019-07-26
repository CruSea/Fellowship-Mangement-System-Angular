import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGraduatesComponent } from './post-graduates.component';

const routes: Routes = [
  {
    path: '',
    component: PostGraduatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGraduatesRoutingModule { }
