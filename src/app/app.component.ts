import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Override';
  constructor(
    private authSerivce: AuthService
  ){}
   
    ngOnInit(){
      this.authSerivce.getAuthData();
      console.log(this.authSerivce.getAuthData())
    }
}
