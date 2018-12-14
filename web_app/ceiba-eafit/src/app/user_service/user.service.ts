import { Injectable } from '@angular/core';
import { ServicesSettings } from '../services_settings';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class UserService {
  apiUrl = this.servicesSettings.getApiUrl();
  constructor(private http: HttpClient, public servicesSettings: ServicesSettings) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUserById(userName): Observable<any> {
    return this.http.post(this.apiUrl + 'get_user', { 'userName': userName }, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  userLogin(userName, password): Observable<any> {
    return this.http.post(this.apiUrl + 'user_login', {
      'userName': userName,
      'password': password
    }, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  userRegistration(f_name,l_name,email,type,password): Observable<any>{
    return this.http.post(this.apiUrl+'user',{
      f_name : f_name,
      l_name:l_name,
      userName:email,
      type:type,
      password:password
    },httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
