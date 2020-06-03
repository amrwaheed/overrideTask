import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommentsService } from 'src/app/_services/comments.service';

@Component({
  selector: 'app-comments-control',
  templateUrl: './comments-control.component.html',
  styleUrls: ['./comments-control.component.css']
})
export class CommentsControlComponent implements OnInit {
  private mode = 'create';

  form: FormGroup;
  constructor(
    public route: ActivatedRoute,
    private commentsService: CommentsService ,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] }),
      'body': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'postId': new FormControl(null),

    });

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {

        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.commentsService.get_Comments_by_id(+paramMap.get('id')).subscribe(
            postData => {
              console.log(postData)
                this.form.patchValue({
                  "id" : postData.id,
                  "name" : postData.name,
                  "email" : postData.email,
                  "body" : postData.body,
                  "postId" :  postData.postId 
                });
              
            }
          ) 
        } else {
          this.mode = 'create';
        }
      }

    )
  }

  get name(){return this.form.get('name')}
  get email(){return this.form.get('email')}
  get body(){return this.form.get('body')}

  onSubmitPost(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      let random = Math.floor(Math.random() * 1000) + 1 ;
      this.form.value.id = random;
      this.form.value.postId = random;
      this.commentsService.create_new_comment(this.form.value)
    }else{
    
      this.commentsService.update_comment(this.form.value.id,this.form.value)
    }
  }

}
