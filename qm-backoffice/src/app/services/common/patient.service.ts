import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GridModel } from '../../models/grid.model';
import { ProjectSummaryModel } from '../../models/project-summary.model';
import { PatientModel } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _url = `${BACKEND_URL}/patient`;

  constructor(
    private _http: HttpClient,
  ) { }

  get(id: number): Observable<PatientModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<PatientModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<PatientModel> {
    const url = `${this._url}/`;
    return this._http.post<PatientModel>(url, data).pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<PatientModel> {
    const url = `${this._url}/${id}`;
    return this._http.patch<PatientModel>(url, data).pipe(catchError(this.handleError));
  }

  getList(limit: number, offset: number, order: string, orderBy: string, name: string, last_name: string, identification_number: string, doctor: string, nurseId: number): Observable<GridModel<PatientModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${(name) ? `&name=${name}` : ''}${(last_name) ? `&last_name=${last_name}` : ''}${(identification_number) ? `&identification_number=${identification_number}` : ''}${(doctor) ? `&doctor=${doctor}` : ''}${(nurseId) ? `&nurse_id=${nurseId}` : ''}`;
    return this._http.get<GridModel<PatientModel>>(url).pipe(catchError(this.handleError));
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