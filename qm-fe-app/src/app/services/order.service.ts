import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/restaurant";
import { Order } from "../interfaces/order";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrder() {
    return this.http.get<Order>("/assets/data/orders.json");
  }
}
