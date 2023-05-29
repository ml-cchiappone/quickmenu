import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PatientSupplyModel } from '../../models/patient-supply.model';
import { GridModel } from '../../models/grid.model';
import { ProjectSummaryModel } from '../../models/project-summary.model';

@Injectable({
  providedIn: 'root'
})
export class PatientSupplyService {

  private _url = `${BACKEND_URL}/patient_supply`;

  constructor(
    private _http: HttpClient,
  ) { }

  get(id: number): Observable<PatientSupplyModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<PatientSupplyModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<PatientSupplyModel> {
    const url = `${this._url}/`;
    return this._http.post<PatientSupplyModel>(url, data).pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<PatientSupplyModel> {
    const url = `${this._url}/${id}`;
    return this._http.patch<PatientSupplyModel>(url, data).pipe(catchError(this.handleError));
  }

  getList(limit: number, offset: number, order: string, orderBy: string, userId: number, title: string, state: string): Observable<GridModel<PatientSupplyModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${(userId) ? `&user_id=${userId}` : ''}${(title) ? `&name=${title}` : ''}${(state) ? `&state=${state}` : ''}`;
    return this._http.get<GridModel<PatientSupplyModel>>(url).pipe(catchError(this.handleError));
  }

  getSummary(): Observable<ProjectSummaryModel> {
    const url = `${this._url}/summary`;
    return this._http.get<ProjectSummaryModel>(url).pipe(catchError(this.handleError));
  }

  getLastModified(projectId: number) {
    const url = `${this._url}/last_modified/${projectId}`;
    return this._http.get(url).pipe(catchError(this.handleError));
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