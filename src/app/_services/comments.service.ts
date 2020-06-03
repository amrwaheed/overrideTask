import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Comments } from '../_modules/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl:string = `https://jsonplaceholder.typicode.com/comments`;
  constructor(
    private http : HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  /**
   * Return all posts in array
   */
    get_all_comments():Observable<Comments[]>{
     return this.http.get<Comments[]>(this.baseUrl);
    }

    /**
     * get Comment by Id 
     * @param id 
     */
    get_Comments_by_id(id:number): Observable<Comments>{
      return this.http.get<Comments>(`${this.baseUrl}/${id}`)
    }

    /**
     * create new Comments
     * @param comment 
     */
    create_new_comment(comment:Comments){
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
       this.http.post<Comments>(this.baseUrl, comment,{headers})
       .subscribe(
        postData =>{
          this.toastr.success('Comment Saved Successfully', 'Add Comment');
      
          this.router.navigate(['/panal','comments','all'])
        },
        error =>{
          console.log(error)
        }
      ) 
    }

  

    /**
     * update Comment by Id
     * @param Comment 
     */
    update_comment(id:number,comment:Comments){
       this.http.put<void>(this.baseUrl +'/'+ id, comment).subscribe(
        (result)=>{
          console.log(result)
          this.toastr.success('Comment Updated Successfully', 'Update Comment');
          this.router.navigate(['/panal','comments','all'])
        }
      );
    }

    /**
     * Delete Comment by Id
     * @param id 
     */
    delete_comment(id:number) {
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
    }


}
