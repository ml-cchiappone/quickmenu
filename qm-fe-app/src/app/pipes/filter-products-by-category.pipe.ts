import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterProductsByCategory"
})
export class FilterProductsByCategoryPipe implements PipeTransform {
  transform(array: any[], category_id: number): any[] {
    return !array || !category_id
      ? array
      : array.filter((c) => (c.id == category_id ? true : false));
  }
}
