import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from 'src/app/models/order.model';
import { OrderService } from '../../../../services/common/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-restaurant-order',
  templateUrl: './restaurant-order.component.html',
  styleUrls: ['./restaurant-order.component.css'],
})
export class RestaurantOrderComponent implements OnInit {
  snackBar: any;
  title: string = 'Titulo Modal';
  titleColor: string = 'black';
  action: String;
  orderId: number;
  order: OrderModel;
  denyBtnValue: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    public orderService: OrderService
  ) {
    this.denyBtnValue = data.denyBtnValue
      ? data.denyBtnValue
      : this.denyBtnValue;
    this.orderId = data?.orderId;
    this.title = data.title ? data.title : this.title;
    this.titleColor = data.titleColor ? data.titleColor : this.titleColor;
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const limit = 30;
    const offset = 0;
    try {
      this.orderService.get(this.orderId).subscribe(
        (resp: OrderModel) => {
          this.order = resp;
          return;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch {
      console.log('error');
    }
  }

  changeOrderStatus(orderId, newStatus) {
    try {
      this.orderService.update(orderId, { status_code: newStatus }).subscribe(
        (resp) => {
          this.callSnackBar(
            `La orden fue actualizada correctamente`,
            2500,
            'notif-success'
          );
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al actualizar la orden!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  callSnackBar(text: string, duration: number, color: string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { success: true, message: text },
      duration: duration,
      panelClass: [color],
    });
  }
}
