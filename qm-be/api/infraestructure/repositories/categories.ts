import Category from "../../domain/repositories/category/model";

class CategoriesRepository {
  constructor() {}

  getAll(restaurantId: number) {
    return Category.findAndCountAll({
      where: {
        restaurant_id: restaurantId
      }
    });
  }

  get(categoryId: string) {
    return Category.findOne({
      where: {
        id: categoryId
      }
    });
  }
}

export default CategoriesRepository;
