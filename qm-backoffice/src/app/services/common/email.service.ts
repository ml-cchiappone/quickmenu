import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { EmailModel, ReceiverListModel } from '../../models/email.model';
import { GridModel } from '../../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private _url = `${BACKEND_URL}/mail`;

  constructor(private _http: HttpClient) {}

  get(id: number): Observable<EmailModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<EmailModel>(url).pipe(catchError(this.handleError));
  }

  getReceiverList(id: number): Observable<Array<ReceiverListModel>> {
    const url = `${this._url}/receivers?created_by=${id}`;
    return this._http
      .get<Array<ReceiverListModel>>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any, file: File): Observable<EmailModel> {
    const url = `${this._url}/`;

    if (file !== null) {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.buildFormData(formData, data, null);
      return this._http
        .post<EmailModel>(url, formData)
        .pipe(catchError(this.handleError));
    }

    return this._http
      .post<EmailModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  buildFormData(formData: FormData, data: any, parentKey: string) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach(key => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<EmailModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<EmailModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    subject: string,
    text: string,
    createdBy: number,
    receivers: string
  ): Observable<GridModel<EmailModel>> {
    const url = `${
      this._url
    }?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      subject ? `&subject=${subject}` : ''
    }${text ? `&text=${text}` : ''}${
      createdBy ? `&created_by=${createdBy}` : ''
    }${receivers ? `&receivers=${receivers}` : ''}`;
    return this._http
      .get<GridModel<EmailModel>>(url)
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
