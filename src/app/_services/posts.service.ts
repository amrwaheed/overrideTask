import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Posts } from '../_modules/posts';

import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PostsService {


  private baseUrl:string = `https://jsonplaceholder.typicode.com/posts`;
  constructor(
    private http : HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  /**
   * Return all posts in array
   */
    get_all_posts():Observable<Posts[]>{
     return this.http.get<Posts[]>(this.baseUrl);
    }

    /**
     * get post by Id 
     * @param id 
     */
    get_post_by_id(id:number): Observable<Posts>{
      return this.http.get<Posts>(`${this.baseUrl}/${id}`)
    }

    /**
     * create new Post
     * @param post 
     */
    create_new_post(post:Posts){
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
       this.http.post<Posts>(this.baseUrl, post,{headers})
       .subscribe(
        postData =>{
          this.toastr.success('Post Saved Successfully', 'Add Post');
      
          this.router.navigate(['/panal','posts','all'])
        },
        error =>{
          console.log(error)
        }
      ) 
    }

  

    /**
     * update post by Id
     * @param post 
     */
    update_post(id:number,post:Posts){
       this.http.put<void>(this.baseUrl +'/'+ id, post).subscribe(
        (result)=>{
          console.log(result)
          this.toastr.success('Post Updated Successfully', 'Update Post');
          this.router.navigate(['/panal','posts','all'])
        }
      );
    }

    /**
     * Delete post by Id
     * @param id 
     */
    delete_post(id:number) {
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
    }



}
