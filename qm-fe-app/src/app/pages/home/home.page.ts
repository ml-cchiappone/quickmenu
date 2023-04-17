import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { RestaurantService } from "../../services/restaurant.service";
import { Restaurant } from "../../interfaces/restaurant";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  restaurants: Observable<Restaurant[]>;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants(); // TODO: Si trae N, acotar a 3 y mostrar el CTA para ver todos
  }
}
