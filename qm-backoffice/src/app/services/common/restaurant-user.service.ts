import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRolModel, AvailableRoles } from '../../models/user-rol.model';
import { GridModel } from '../../models/grid.model';
import { RestaurantUserModel } from '../../models/restaurant-user.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantUserService {
  private _url = `${BACKEND_URL}/restaurant/`;

  constructor(private _http: HttpClient) {}

  get(rolId: string): Observable<UserRolModel> {
    const url = `${this._url}/${rolId}`;
    return this._http.get<UserRolModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<RestaurantUserModel> {
    const { user_id: userId, restaurant_id: restaurantId } = data;
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/users/${userId}`;
    return this._http
      .post<RestaurantUserModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(userId: number, rolId: any): Observable<{}> {
    const url = `${BACKEND_URL}/mobile/users/${userId}/roles/${rolId}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<UserRolModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<UserRolModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(): Observable<GridModel<UserRolModel>> {
    const url = `${this._url}`;
    return this._http
      .get<GridModel<UserRolModel>>(url)
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
