import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Menu } from "../interfaces/menu";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenuOpts() {
    return this.http.get<Menu[]>("/assets/data/menu-opts.json");
  }
}
