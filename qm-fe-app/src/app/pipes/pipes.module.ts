import { NgModule } from "@angular/core";
import { FilterProductsByCategoryPipe } from "./filter-products-by-category.pipe";

@NgModule({
  declarations: [FilterProductsByCategoryPipe],
  exports: [FilterProductsByCategoryPipe]
})
export class PipesModule {}
