import { NgModule } from "@angular/core";
import { FilterProductsPipe } from "./filter.pipe";

@NgModule({
  declarations: [FilterProductsPipe],
  exports: [FilterProductsPipe]
})
export class PipesModule {}
