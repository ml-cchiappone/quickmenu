import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GridModel } from '../../models/grid.model';
import { ProductModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string;
  constructor(private _http: HttpClient) {}

  getList(
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
    name: string,
    restaurantId: string,
    categoryId: number
  ): Observable<GridModel<ProductModel>> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/categories/${categoryId}/products?limit=${limit}&offset=${offset}&order=${order}&order_by=${orderBy}${
      name ? `&name=${name}` : ''
    }`;
    return this._http
      .get<GridModel<ProductModel>>(url)
      .pipe(catchError(this.handleError));
  }

  create(data: any): Observable<ProductModel> {
    const { category_id, restaurant_id } = data;
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurant_id}/categories/${category_id}/products`;
    return this._http
      .post<ProductModel>(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(
    restaurantId: string,
    categoryId: number,
    productId: any
  ): Observable<{}> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/categories/${categoryId}/products/${productId}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  update(
    restaurantId: string,
    categoryId: number,
    productId: any,
    data: any
  ): Observable<ProductModel> {
    const url = `${BACKEND_URL}/mobile/restaurants/${restaurantId}/categories/${categoryId}/products/${productId}`;
    return this._http
      .post<ProductModel>(url, data)
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
