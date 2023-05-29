import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BACKEND_URL } from "src/app/config/config";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProvinceModel } from "../../models/province.model";
import { GridModel } from "../../models/grid.model";

@Injectable({
  providedIn: "root"
})
export class ProvinceService {
  private _url = `${BACKEND_URL}/mobile/provinces`;

  constructor(private _http: HttpClient) {}

  get(id: number): Observable<ProvinceModel> {
    const url = `${this._url}/${id}`;
    return this._http
      .get<ProvinceModel>(url)
      .pipe(catchError(this.handleError));
  }

  getList(
    limit: number,
    offset: number,
  ): Observable<GridModel<ProvinceModel>> {
    const url = `${this._url}?limit=${limit}&offset=${offset}`;
    return this._http
      .get<GridModel<ProvinceModel>>(url)
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
