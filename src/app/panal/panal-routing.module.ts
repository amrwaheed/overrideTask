import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostControlComponent } from './post-control/post-control.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { CommentsControlComponent } from './comments-control/comments-control.component';


const routes: Routes = [
  { path: "posts" , children:[
    { path: "all",  component: AllPostsComponent },
    { path: "control", component: PostControlComponent },
    { path: "control/:id/edit", component: PostControlComponent },

  ]},
  { path: "comments" , children:[
    { path: "all",  component: AllCommentsComponent },
    { path: "control", component: CommentsControlComponent },
    { path: "control/:id/edit", component: CommentsControlComponent },

  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanalRoutingModule { }
