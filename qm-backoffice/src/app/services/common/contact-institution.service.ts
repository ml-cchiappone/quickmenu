import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GridModel } from '../../models/grid.model';
import {
  ContactInstitutionModel,
  ContactInstitutionEmailListModel
} from '../../models/contact-institution.model';

@Injectable({
  providedIn: 'root'
})
export class ContactInstitutionService {
  private _url = `${BACKEND_URL}/contact_institution`;

  constructor(private _http: HttpClient) {}

  get(id: string): Observable<ContactInstitutionModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .get<ContactInstitutionModel>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<ContactInstitutionModel> {
    const url = `${this._url}/`;
    return this._http
      .post<ContactInstitutionModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<ContactInstitutionModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<ContactInstitutionModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
    description: string,
    email: boolean
  ): Observable<GridModel<ContactInstitutionModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}${
      description ? `&description=${description}` : ''
    }${email ? `&email=${email}` : ''}`;
    return this._http
      .get<GridModel<ContactInstitutionModel>>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
