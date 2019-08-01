import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGraduatesGroupsDetailComponent } from './post-graduates-groups-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PostGraduatesGroupsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGraduatesGroupsDetailRoutingModule { }
