import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule)
  },
  {
    path: "alert",
    loadChildren: () =>
      import("./pages/alert/alert.module").then((m) => m.AlertPageModule)
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule)
  },
  {
    path: "restaurant",
    loadChildren: () =>
      import("./pages/restaurant/restaurant.module").then(
        (m) => m.RestaurantPageModule
      )
  },
  {
    path: "order",
    loadChildren: () =>
      import("./pages/order/order.module").then((m) => m.OrderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
