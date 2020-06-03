import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPostsComponent } from './show-posts/show-posts.component';


const routes: Routes = [
  {
    path:"", component:ShowPostsComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
