import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogingMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router){}

  onSwitchMode(){
    this.isLogingMode = !this.isLogingMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    
    if(this.isLogingMode){
      authObservable = this.authService.login(email, password);
    }else {
      authObservable = this.authService.signUp(email,password);
    }

    // This code is shared by both login && signup methods
    authObservable.subscribe(resData =>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
    errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    }
    );

    form.reset();
  }

}
