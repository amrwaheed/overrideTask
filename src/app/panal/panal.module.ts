import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanalRoutingModule } from './panal-routing.module';
import { AdminComponent } from './admin/admin.component';
import { PostControlComponent } from './post-control/post-control.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { CommentsControlComponent } from './comments-control/comments-control.component';


@NgModule({
  declarations: [AdminComponent, PostControlComponent, AllPostsComponent, AllCommentsComponent, CommentsControlComponent],
  imports: [
    CommonModule,
    PanalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PanalModule { }
