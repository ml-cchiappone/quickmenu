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
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    try {
      this.restaurantService.getRestaurants().subscribe(
        (resp: Restaurant[]) => {
          if (resp) {
            this.restaurants = resp;
          } else {
            // TODO: Si la respuesta no es valida, navegar a página de error
          }
        },
        (err) => {
          console.log(err);
          // TODO: Si el servicio falla, navegar a pagína de error
        }
      );
    } catch (error) {
      // TODO: manejar el error
    }
  }
}
