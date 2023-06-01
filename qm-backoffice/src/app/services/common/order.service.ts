import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderModel } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _url = `${BACKEND_URL}/mobile/orders`;

  constructor(private _http: HttpClient) {}

  get(orderId: number): Observable<OrderModel> {
    const url = `${this._url}/${orderId}`;
    return this._http.get<OrderModel>(url).pipe(catchError(this.handleError));
  }

  update(orderId: number, data: any): Observable<OrderModel> {
    const url = `${this._url}/${orderId}/status`;
    return this._http
      .post<OrderModel>(url, data)
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
    return throwError(error);
  }
}
