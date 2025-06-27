import { AuthResponseData, AuthService } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ``,
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid) return;

    let authObs:Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
     authObs= this.authService.login(form.value.email, form.value.password)
    } else {
     authObs= this.authService
        .signUpUser(form.value.email, form.value.password)
    }

    authObs.subscribe(
        (res)=>{
        console.log(res);
        this.isLoading=false;
        this.error=null;
        form.reset();
        },
        (errorMsg)=>{
          console.log(errorMsg);
          this.isLoading=false;
          this.error=errorMsg;
        }
      )
    // form.reset();
  }
}
