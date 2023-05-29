import TablesRepository from "../../../infraestructure/repositories/tables";

export default class TablesGetAllByRestaurant {
  constructor() {}

  async execute(restaurantId: number) {
    try {
      return await new TablesRepository().getAllByRestaurant(restaurantId);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAllByCategory.ts:10 ~ TablesGetAllByRestaurant ~ execute ~ error:",
        error
      );
    }
  }
}
