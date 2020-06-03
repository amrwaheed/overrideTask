import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/_services/posts.service';
import { Posts } from 'src/app/_modules/posts';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent implements OnInit {

  posts:Posts [] = [];
  constructor(
    private postService: PostsService
  ) { }

  ngOnInit() {
    this.postService.get_all_posts().subscribe(
      (postsData)=>{
        this.posts = postsData;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
