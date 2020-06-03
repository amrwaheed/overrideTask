import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

import { Posts } from 'src/app/_modules/posts';

@Component({
  selector: 'app-post-control',
  templateUrl: './post-control.component.html',
  styleUrls: ['./post-control.component.css']
})
export class PostControlComponent implements OnInit {
  private mode = 'create';

  form: FormGroup;
  constructor(
    public route: ActivatedRoute,
    private postsService: PostsService,
    
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(null),
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'body': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'userId': new FormControl(null),

    });

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {

        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.postsService.get_post_by_id(+paramMap.get('id')).subscribe(
            postData => {
                this.form.patchValue({
                  "id" : postData.id,
                  "title" : postData.title,
                  "body" : postData.body,
                  "userId" :  postData.userId 
                });
              
            }
          ) 
        } else {
          this.mode = 'create';
         
        }
      }

    )

  }

  get title(){return this.form.get('title')}
  get body(){return this.form.get('body')}

  onSubmitPost(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      // console.log(this.form.value)
      let random = Math.floor(Math.random() * 1000) + 1 ;// Math.round(Math.max(Math.random()*8)*12);
      this.form.value.id = random;
      this.form.value.userId = random;
      this.postsService.create_new_post(this.form.value)
    }else{
      console.log(this.form.value);
      this.postsService.update_post(this.form.value.id,this.form.value)
    }
  }

}
