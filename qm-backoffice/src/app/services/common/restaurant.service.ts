import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GridModel } from '../../models/grid.model';
import { RestaurantModel, RestaurantOrders } from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private _url = `${BACKEND_URL}/mobile/restaurants`;

  constructor(private _http: HttpClient) {}

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    name: string
  ): Observable<GridModel<RestaurantModel>> {
    const url = `${
      this._url
    }?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      name ? `&name=${name}` : ''
    }`;
    return this._http
      .get<GridModel<RestaurantModel>>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<RestaurantModel> {
    const url = `${this._url}`;
    return this._http
      .post<RestaurantModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<RestaurantModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .post<RestaurantModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getOrdersByOrderStatus(id: string, order_status_code = null) {
    const url = `${this._url}/${id}/orders/order_status/${order_status_code ? order_status_code : "all"}`;
    return this._http
      .get<GridModel<RestaurantOrders>>(url)
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
