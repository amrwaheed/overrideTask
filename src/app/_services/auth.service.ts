import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Users } from '../_modules/users';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(
    private afauth: AngularFireAuth,
    private db: AngularFirestore,
    public router: Router,
    private toastr: ToastrService

  ) {
    this.afauth.authState.subscribe((user) => {
      // console.log(user)
      if (user) {
      // console.log(user)
        
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/panal','posts','all']);
      } else {
        
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
    
   }


   registerUser(authData: Users) {
    this.afauth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        console.log(user)
        this.db.collection('users').doc(user.user.uid).valueChanges()

      })
      .catch((err) => {
          console.log(err)
      });
  }


  login(authData : Users){
    this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((user) => {
      console.log(user)
      localStorage.setItem('uid',user.user.uid);
      this.isAuthenticated = true;
      this.authChange.next(true)
      this.toastr.success('Login Successfully', 'Login');
      this.router.navigate(['/panal','posts','all'])
    })
    .catch((err) => {
        console.log(err)
        this.authChange.next(false)
        this.toastr.error(err.code, 'Login');
    });
  }

  logout(){
    this.isAuthenticated = false;
    this.authChange.next(false)
    localStorage.removeItem('uid');
    this.router.navigate(['/login'])
    this.toastr.success('LogOut Successfull', 'LogOut');
    this.afauth.auth.signOut();
  }

  getAuthStatusListener() {
    return this.authChange.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  
  getAuthData(){
    let uid = localStorage.getItem('uid')
    if (!uid){
      this.isAuthenticated = false;
      this.authChange.next(false)
      return;
    }
    this.isAuthenticated = true;
    this.authChange.next(true)
    return true;
  }
}
