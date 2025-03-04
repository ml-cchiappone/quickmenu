import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Restaurant,
  Category,
  Product,
  GridModel
} from "../interfaces/restaurant";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  private _url = `${environment.apiBaseUrl}/restaurants`;

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    const url = this._url;
    return this.http.get<Restaurant[]>(url);
  }

  getRestaurantCategories() {
    return this.http.get<Category[]>("/assets/data/categories.json");
  }

  getRestaurantProducts() {
    return this.http.get<Product[]>("/assets/data/products.json");
  }

  getRestaurantCategoriesAndProducts(
    restaurantId: string
  ): Observable<GridModel<Category>> {
    const url = `${this._url}/${restaurantId}/products`;
    return this.http.get<GridModel<Category>>(url);
  }
}
