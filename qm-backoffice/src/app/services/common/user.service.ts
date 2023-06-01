import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GridModel } from '../../models/grid.model';

interface AuthToken {
  token: string;
  userAuth: UserLoginData;
}
interface UserLoginData {
  _id: string;
  business: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserModel;
  token: string;
  userLoginData: UserLoginData;
  private _url = `${BACKEND_URL}/mobile/users`;

  constructor(
    public router: Router,
    private _http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    if (localStorage.getItem('jwt-token')) {
      this.token = localStorage.getItem('jwt-token');
    } else {
      this.token = '';
    }
  }

  getUser(userId: string): Observable<UserModel> {
    const url = `${this._url}/${userId}`;
    return this._http.get<UserModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<UserModel> {
    const url = `${this._url}`;
    return this._http
      .post<UserModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  update(userId: number, data: any): Observable<UserModel> {
    const url = `${this._url}/${userId}`;
    return this._http
      .patch<UserModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  updatePassword(userId: number, data: any): Observable<any> {
    const url = `${this._url}/${userId}/password`;
    return this._http.patch(url, data).pipe(catchError(this.handleError));
  }

  recoverPassword(data: any): Observable<any> {
    const url = `${this._url}/password/recover`;
    return this._http.patch(url, data).pipe(catchError(this.handleError));
  }

  unsubscribe(userId: number): Observable<any> {
    const url = `${this._url}/${userId}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  subscribe(userId: number, data: any): Observable<any> {
    const url = `${this._url}/${userId}/activate`;
    return this._http.post(url, data).pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    email: string
  ): Observable<GridModel<UserModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}&email=${email}`;
    return this._http
      .get<GridModel<UserModel>>(url)
      .pipe(catchError(this.handleError));
  }

  // @@ TODO: move this to AuthService ?
  login(dataLogin: any) {
    const url = `${BACKEND_URL}/mobile/auth`;
    return this._http.post(url, dataLogin).pipe(
      map((resp: AuthToken) => {
        this.token = resp.token;
        this.userLoginData = resp.userAuth;
        return resp;
      })
    );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  isLogged() {
    return this.token.length > 0;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt-token');
    return !this.jwtHelper.isTokenExpired(token);
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
