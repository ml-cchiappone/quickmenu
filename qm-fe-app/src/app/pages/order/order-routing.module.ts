import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';
import { OrderStatusPage } from './status/order-status.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  },
  {
    path: ':id/status',
    component: OrderStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
