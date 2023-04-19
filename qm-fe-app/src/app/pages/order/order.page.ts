import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { ActivatedRoute } from "@angular/router";
import { Order } from "src/app/interfaces/order";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"]
})
export class OrderPage implements OnInit {
  orderId: number;
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.params.id; // TODO: Validar parámetro
    console.log(this.orderId);
    this.getOrder(this.orderId);
  }
  // TODO: Manejar cantidades
  //  Poder sacar/agregar productos del carrito

  getOrder(orderId: number) {
    try {
      this.orderService
        .getOrder()
        // TODO: Validar modelo de la respuesta
        .subscribe(
          (resp) => {
            if (resp) {
              this.order = resp;
              console.log(this.order);
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
