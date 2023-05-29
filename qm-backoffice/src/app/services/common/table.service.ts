import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GridModel } from '../../models/grid.model';
import { TableModel } from '../../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private _url = `${BACKEND_URL}/mobile/restaurants`;

  constructor(private _http: HttpClient) {}

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    name: string,
    restaurantId: string
  ): Observable<GridModel<TableModel>> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/tables?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      name ? `&name=${name}` : ''
    }`;
    return this._http
      .get<GridModel<TableModel>>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<TableModel> {
    const { restaurant_id } = data;
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurant_id}/tables`;
    return this._http
      .post<TableModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(restaurantId: string, tableId: number): Observable<{}> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/tables/${tableId}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(
    restaurantId: string,
    tableId: number,
    data: any
  ): Observable<TableModel> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/tables/${tableId}`;
    return this._http
      .post<TableModel>(url, data)
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
