import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { Order } from "src/app/interfaces/order";
import { StorageService } from "../../services/storage.service";
import { Product } from "../../interfaces/restaurant";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"]
})
export class OrderPage implements OnInit {
  orderId: number;
  order: Order = {
    products: []
  };
  productsOrder: Product[];
  totalAmount: number;
  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private alertController: AlertController,
    private navController: NavController
  ) {}
  async ngOnInit() {
    // TODO: no hay orden ni productos => volver a la page del restaurant
    // TODO: salgo de la orden, elimino pedido
    await this.getOrder();
    this.createOrUpdateOrderEntity();
    this.calculateTotalAmount();
  }

  async getOrder() {
    this.order = await this.storageService.get("order");
    if (!this.order) {
      this.productsOrder = await this.storageService.get("products_order");
    }
  }

  createOrUpdateOrderEntity() {
    this.order = {
      products: []
    };
    this.productsOrder?.forEach((product) => {
      const { id, name, description, thumbnail, price } = product;
      this.order.products[id] = {
        id,
        name,
        description,
        thumbnail,
        quantity: (this.order.products[id]?.quantity | 0) + 1,
        price,
        totalPrice: (this.order.products[id]?.totalPrice | 0) + parseInt(price)
      };
    });
    this.order.products = this.order.products.filter((e) => Boolean(e));
  }

  calculateTotalAmount() {
    this.totalAmount = this.order.products?.reduce((total, product) => {
      return total + product.totalPrice;
    }, 0);
  }

  changeProductsFromOrder(product, action) {
    this.order.products = this.order.products.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          quantity: action === "delete" ? p.quantity - 1 : p.quantity + 1,
          totalPrice:
            action === "delete"
              ? p.totalPrice - parseInt(p.price)
              : p.totalPrice + parseInt(p.price)
        };
      }
      return p;
    });
    this.storageService.set("order", this.order);
    this.calculateTotalAmount();
  }

  async backGuard() {
    const alert = await this.alertController.create({
      header: "Cuidado!",
      message: "Al volver tu orden se perderá. ¿Deseas continuar?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.navController.navigateBack("/");
            this.storageService.clear();
          },
          cssClass: "rojo"
        },
        {
          text: "No",
          role: "cancel"
        }
      ]
    });

    await alert.present();
  }
}
