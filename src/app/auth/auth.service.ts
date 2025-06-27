import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpUser(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(this.handleError))
  }

  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    {email: email, password: password, returnSecureToken: true})
    .pipe(catchError(this.handleError))
  }

  private handleError(errorRes:HttpErrorResponse){
    console.log(errorRes);
    
    let errorMsg="An unknown error occured!"
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message){
            case "EMAIL_EXISTS": errorMsg="The email address is already in use by another account.";break;
            case "OPERATION_NOT_ALLOWED": errorMsg="Password sign-in is disabled for this project";break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER": errorMsg="We have blocked all requests from this device due to unusual activity. Try again later"; break;
            case "EMAIL_NOT_FOUND": errorMsg="There is no user record corresponding to this identifier";break;
            case "INVALID_PASSWORD": errorMsg="The password is invalid or the user does not have a password";break;
            case "USER_DISABLED": errorMsg="The user account has been disabled by an administrator"; break;
            case "INVALID_LOGIN_CREDENTIALS": errorMsg="Invalid login credentials"; break;
        }
        return throwError(errorMsg);
  }
}
