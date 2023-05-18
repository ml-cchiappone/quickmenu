import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { Order } from "src/app/interfaces/order";
import { Product } from "../../../interfaces/restaurant";
import { AlertController, NavController } from "@ionic/angular";
import { OrderPageModule } from "../order.module";
import { StorageService } from "src/app/services/storage.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order",
  templateUrl: "./order-status.page.html",
  styleUrls: ["./order-status.page.scss"]
})
export class OrderStatusPage implements OnInit {
  orderId: number;
  order;
  productsOrder: Product[];
  totalAmount: number;
  restaurantId: number;
  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private alertController: AlertController,
    private navController: NavController,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    this.orderId = this.route.snapshot.params.id; // TODO: Validar parámetro
    await this.getOrder();
    this.restaurantId = await this.storageService.get("restaurant_id");
  }

  async getOrder() {
    this.order = await this.storageService.get("order");
    if (!this.order) {
      try {
        this.orderService.getOrder(this.orderId).subscribe(
          (resp) => {
            if (resp) {
              this.order = resp;
              console.log(
                "🚀 ~ file: order-status.page.ts:46 ~ OrderPage ~ getOrder ~ order:",
                this.order
              );
              this.calculateTotalAmount();
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

  calculateTotalAmount() {
    this.totalAmount = this.order.order_products.reduce((total, p) => {
      return total + parseInt(p.products.price);
    }, 0);
  }
}
