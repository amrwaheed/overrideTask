import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/_modules/posts';
import { PostsService } from 'src/app/_services/posts.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {


  posts: Posts[] = [];
  constructor(
    private postService: PostsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
    this.postService.get_all_posts().subscribe(
      (postsData) => {
        this.posts = postsData;
      } 
    )
    
  }

  onDelete(id: number, index: number) {

    // this.posts.splice(index, 1)
    this.postService.delete_post(id).subscribe(
      () => {
        this.toastr.success('Delete Successfull', 'Delete');
        this.posts.splice(index, 1)
      } 
    )
  }

}
