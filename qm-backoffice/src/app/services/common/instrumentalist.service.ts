import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstrumentalistModel } from '../../models/instrumentalist.model';
import { GridModel } from '../../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentalistService {
  private _url = `${BACKEND_URL}/instrumentalist`;

  constructor(private _http: HttpClient) {}

  get(id: string): Observable<InstrumentalistModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .get<InstrumentalistModel>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<InstrumentalistModel> {
    const url = `${this._url}/`;
    return this._http
      .post<InstrumentalistModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<InstrumentalistModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<InstrumentalistModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number
  ): Observable<GridModel<InstrumentalistModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}`;
    return this._http
      .get<GridModel<InstrumentalistModel>>(url)
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
