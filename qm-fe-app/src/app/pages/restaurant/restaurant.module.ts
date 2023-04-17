import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RestaurantPageRoutingModule } from "./restaurant-routing.module";

import { RestaurantPage } from "./restaurant.page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPageRoutingModule,
    PipesModule
  ],
  declarations: [RestaurantPage]
})
export class RestaurantPageModule {}
