import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RolModel } from '../../models/rol.model';
import { GridModel } from '../../models/grid.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _url = `${BACKEND_URL}/mobile/roles`;

  constructor(
    private _http: HttpClient,
  ) { }

  get(rolId: string): Observable<RolModel> {
    const url = `${this._url}/${rolId}`;
    return this._http.get<RolModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<RolModel> {
    const url = `${this._url}/`;
    return this._http.post<RolModel>(url, data).pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<RolModel> {
    const url = `${this._url}/${id}`;
    return this._http.patch<RolModel>(url, data).pipe(catchError(this.handleError));
  }

  subscribe(userId: number, data: any): Observable<any> {
    const url = `${this._url}/${userId}/activate`;
    return this._http.post(url, data)
      .pipe(
        map(resp => resp),
        catchError(err => throwError(err)) 
      )
  }

  getList(): Observable<GridModel<RolModel>> {
    const url = `${this._url}`;
    return this._http.get<GridModel<RolModel>>(url).pipe(catchError(this.handleError));
  }

  getUsersRol(rolCode: string): Observable<GridModel<UserModel>>{
    const url = `${this._url}/users/${rolCode}`;
    return this._http.get<GridModel<UserModel>>(url).pipe(catchError(this.handleError));
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
