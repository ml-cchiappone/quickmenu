import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ParametersModel } from '../../models/parameters.model';
import { GridModel } from '../../models/grid.model';
import { ProjectSummaryModel } from '../../models/project-summary.model';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  private _url = `${BACKEND_URL}/parameters`;

  constructor(
    private _http: HttpClient,
  ) { }

  getListDiagnosis(): Observable<GridModel<string>> {
    const url = `${this._url}/diagnosis`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }

	getListComorbidity(): Observable<GridModel<string>> {
    const url = `${this._url}/comorbidity`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListMobility(): Observable<GridModel<string>> {
    const url = `${this._url}/mobility`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundClassification(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/classification`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundInjury(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/injury`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundEtiology(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/etiology`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundExudate(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/exudate`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundExudateAmount(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/exudate_amount`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundHealthySurroundingSkin(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/healthy_surrounding_skin`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }
	
	getListWoundUnhealthySurroundingSkin(): Observable<GridModel<string>> {
    const url = `${this._url}/wound/unhealthy_surrounding_skin`;
    return this._http.get<GridModel<string>>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}