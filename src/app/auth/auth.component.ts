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
  isLoading= false;
  error:string=null;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form:NgForm){
    if(!form.valid) return;
    this.isLoading=true;
    if(this.isLoginMode){

    }
    else{
      this.authService.signUpUser(form.value.email, form.value.password).subscribe(res=>{console.log(res); this.isLoading=false; form.reset(); this.error=null}, errorMsg=>{console.log(errorMsg); this.isLoading=false; this.error=errorMsg});
    }
    // form.reset();
  }
}
