import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGraduatesGroupsComponent } from './post-graduates-groups.component';

const routes: Routes = [
  {
    path: '',
    component: PostGraduatesGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGraduatesGroupsRoutingModule { }
