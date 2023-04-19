import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from "../../services/restaurant.service";
import { Category, Product } from "../../interfaces/restaurant";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.page.html",
  styleUrls: ["./restaurant.page.scss"]
})
export class RestaurantPage implements OnInit {
  restaurantId: string = "";
  categories: Category[];
  products: Product[];
  category: number;
  productsOrder: Product[];
  totalAmount: number;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    /* 
    TODO:
    # validar parámetro
    # con el id obtener el objeto resturant
    # con el id obtener categorias 
    # con el id obtener productos 
    */
    this.restaurantId = this.route.snapshot.params.id; // TODO: Validar parámetro

    console.log(this.restaurantId);
    this.getRestaurantCategoriesAndProducts();
    await this.getProductFromStorage();
    this.calculateTotalAmount();
  }

  changeSegment(event) {
    this.category = event.detail.value;
  }

  getRestaurantProducts() {
    try {
      this.restaurantService
        .getRestaurantProducts()
        // TODO: Validar modelo de la respuesta
        .subscribe(
          (resp) => {
            if (resp) {
              this.products = resp;
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

  getRestaurantCategoriesAndProducts() {
    try {
      this.restaurantService
        .getRestaurantCategoriesAndProducts()
        // TODO: Validar modelo de la respuesta
        .subscribe(
          (resp) => {
            if (resp) {
              this.categories = resp;
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

  async getProductFromStorage() {
    this.productsOrder = await this.storageService.get("products_order");
  }

  addProductInOrder(product) {
    this.productsOrder
      ? this.productsOrder.push(product)
      : (this.productsOrder = [product]);
    this.storageService.set("products_order", this.productsOrder);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.productsOrder?.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
}
