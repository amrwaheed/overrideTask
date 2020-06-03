import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/_modules/comments';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  comments: Comments[] =[];
  private load: Subscription;
  constructor(
    private commentsService:CommentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.load = this.commentsService.get_all_comments().subscribe(
      commentsData =>{
        this.comments = commentsData;
      }
    )
  }

  
  onDelete(id: number, index: number) {

    // this.posts.splice(index, 1)
    this.commentsService.delete_comment(id).subscribe(
      () => {
        this.toastr.success('Delete Successfull', 'Delete');
        this.comments.splice(index, 1)
      } 
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.load.unsubscribe();
  }
}
