import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ``
})
export class AuthComponent {
  constructor(private authService:AuthService){}
  isLoginMode= true;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form:NgForm){
    if(!form.valid) return;

    if(this.isLoginMode){

    }
    else{
      this.authService.signUpUser(form.value.email, form.value.password).subscribe(res=>console.log(res), err=>console.log(err));
    }
    form.reset();
  }
}
