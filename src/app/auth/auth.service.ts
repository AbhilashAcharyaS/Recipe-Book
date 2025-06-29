import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router:Router) {}
  user = new BehaviorSubject<User>(null);
  private tokenExpiryTimer:any;

  signUpUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin(){
    const userData : {email:string, id:string, _token:string, _tokenExpiryDate:string}= JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser=new User(userData.email, userData.id, userData._token, new Date( userData._tokenExpiryDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration=new Date(userData._tokenExpiryDate).getTime()- new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if(this.tokenExpiryTimer){
      clearTimeout(this.tokenExpiryTimer);
    }
    this.tokenExpiryTimer=null;
  }

  autoLogout(expirationDuration:number){
    this.tokenExpiryTimer= setTimeout(()=>{this.logout()},expirationDuration)
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);

    let errorMsg = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD':
        errorMsg =
          'The password is invalid or the user does not have a password';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'Invalid login credentials';
        break;
    }
    return throwError(errorMsg);
  }
}
