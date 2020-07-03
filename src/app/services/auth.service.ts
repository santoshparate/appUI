
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL= environment.API_URL;
  errorData: {};

  constructor(private http: HttpClient) { }

  redirectUrl: string;

  login(username: string, password: string) {

    

    let url = this.API_URL + `/login`
    return this.http.post<any>(url, {email: username, password: password})
    .pipe(map(user => {
     
        if (user && user.token) {
         
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
     
   
    if (localStorage.getItem('currentUser') === null) {
      return false;
      }
    return true;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

     
      console.error('An error occurred:', error.error.message);
    } else {

      
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
