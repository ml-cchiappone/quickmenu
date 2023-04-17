import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Restaurant, Category, Product } from "../interfaces/restaurant";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get<Restaurant[]>("/assets/data/restaurants.json");
  }

  getRestaurantCategories() {
    return this.http.get<Category[]>("/assets/data/categories.json");
  }

  getRestaurantProducts() {
    return this.http.get<Product[]>("/assets/data/products.json");
  }
  
  getRestaurantCategoriesAndProducts() {
    return this.http.get<Category[]>("/assets/data/categories-and-products.json");
  }
}
