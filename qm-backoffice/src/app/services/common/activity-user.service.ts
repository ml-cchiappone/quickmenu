import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivityUserModel } from '../../models/activity-user.mode';
import { GridModel } from '../../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityUserService {

  private _url = `${BACKEND_URL}/activity_user`;

  constructor(
    private _http: HttpClient,
  ) { }

  get(id: number): Observable<ActivityUserModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<ActivityUserModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<ActivityUserModel> {
    const url = `${this._url}/`;
    return this._http.post<ActivityUserModel>(url, data).pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<ActivityUserModel> {
    const url = `${this._url}/${id}`;
    return this._http.patch<ActivityUserModel>(url, data).pipe(catchError(this.handleError));
  }

  getList(limit: number, offset: number, order: string, orderBy: string, project_id: number, user_id: number): Observable<GridModel<ActivityUserModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${(project_id) ? `&project_id=${project_id}` : ''}${(user_id) ? `&user_id=${user_id}` : ''}`;
    return this._http.get<GridModel<ActivityUserModel>>(url).pipe(catchError(this.handleError));
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
