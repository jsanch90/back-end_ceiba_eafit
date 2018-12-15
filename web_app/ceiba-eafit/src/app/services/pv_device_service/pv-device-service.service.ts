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
export class PvDeviceServiceService {
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

  getSensorByName(sensorName){
    return this.http.post(this.apiUrl + 'get_sensor_data', { 'sensor': sensorName }, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
