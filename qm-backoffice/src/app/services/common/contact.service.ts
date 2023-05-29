import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ContactModel } from '../../models/contact.model';
import { GridModel } from '../../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _url = `${BACKEND_URL}/contact`;

  constructor(private _http: HttpClient) {}

  get(id: number): Observable<ContactModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<ContactModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<ContactModel> {
    const url = `${this._url}/`;
    return this._http
      .post<ContactModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<ContactModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<ContactModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    province: string,
    title: string,
    specialty: string,
    institution: string
  ): Observable<GridModel<ContactModel>> {
    const url = `${
      this._url
    }?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      firstName ? `&first_name=${firstName}` : ''
    }${lastName ? `&last_name=${lastName}` : ''}${
      address ? `&address=${address}` : ''
    }${email ? `&email=${email}` : ''}${
      province ? `&province=${province}` : ''
    }${title ? `&title=${title}` : ''}${
      specialty ? `&specialty=${specialty}` : ''
    }${institution ? `&institution=${institution}` : ''}`;
    return this._http
      .get<GridModel<ContactModel>>(url)
      .pipe(catchError(this.handleError));
  }

  getListForEmail(): Observable<GridModel<ContactModel>> {
    const url = `${this._url}/email/list`;

    return this._http
      .get<GridModel<ContactModel>>(url)
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
