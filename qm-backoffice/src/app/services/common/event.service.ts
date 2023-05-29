import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  JsonpClientBackend
} from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { GridModel } from '../../models/grid.model';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url = `${BACKEND_URL}/event`;

  constructor(private _http: HttpClient) {}

  get(id: number): Observable<EventModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<EventModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<EventModel> {
    const url = `${this._url}/`;
    return this._http
      .post<EventModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<EventModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<EventModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    created_by: string,
    init_date: string,
    end_date: string,
    event_type_id: string
  ): Observable<GridModel<EventModel>> {
    const url = `${
      this._url
    }?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      created_by ? `&created_by=${created_by}` : ''
    }${init_date ? `&init_date=${init_date}` : ''}${
      end_date ? `&end_date=${end_date}` : ''
    }${event_type_id ? `&event_type_id=${event_type_id}` : ''}`;
    return this._http
      .get<GridModel<EventModel>>(url)
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
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
