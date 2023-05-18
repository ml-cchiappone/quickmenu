import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../interfaces/order";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private _url = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrder(orderId) {
    const url = `${this._url}/${orderId}`;
    return this.http.get<Order>(url);
  }

  setOrder(order) {
    const url = `${this._url}`;
    return this.http.post<Order>(url, order);
  }
}
