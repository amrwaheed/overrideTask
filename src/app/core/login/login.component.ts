import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', { validators: [Validators.required, Validators.email] }),
      'password': new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }), 
    });
  }

  get email(){return this.form.get('email')}
  get password(){return this.form.get('password')}
  onSubmit(){
    console.log(this.form.value)
    
    if (this.form.invalid) {
      return;
    }

    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password,
    })

  }
}
