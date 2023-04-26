import Restaurant from "../../domain/repositories/restaurant/model";

class RestaurantsRepository {
  constructor() {}

  getAll() {
    return Restaurant.findAndCountAll();
  }

  get(restaurantId: string) {
    return Restaurant.findOne({
      where: {
        string_id: restaurantId
      }
    });
  }
}

export default RestaurantsRepository;
