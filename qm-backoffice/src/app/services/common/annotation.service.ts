import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BACKEND_URL } from "src/app/config/config";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AnnotationModel } from "../../models/annotation.model";

@Injectable({
  providedIn: "root"
})
export class AnnotationService {
  private _url = `${BACKEND_URL}/annotation`;

  constructor(private _http: HttpClient) {}

  get(id: number): Observable<AnnotationModel> {
    const url = `${this._url}/${id}`;
    return this._http.get<AnnotationModel>(url).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<AnnotationModel> {
    const url = `${this._url}/`;
    return this._http
      .post<AnnotationModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<{}> {
    const url = `${this._url}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<AnnotationModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .patch<AnnotationModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
