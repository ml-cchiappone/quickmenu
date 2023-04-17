import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterProducts"
})
export class FilterProductsPipe implements PipeTransform {
  transform(array: any[], category_id: number): any[] {
    return !array || !category_id
      ? array
      : array.filter((c) => (c.id == category_id ? true : false));
  }
}
