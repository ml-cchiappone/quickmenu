import { fn, literal } from "sequelize";
import Category from "../../domain/repositories/category/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class CategoriesRepository {
  constructor() {}

  getAllWithProducts(restaurantId: number) {
    return Category.findAndCountAll({
      include: [
        {
          model: models.product,
          as: "products",
          attributes: [
            "id",
            "name",
            "description",
            "price",
            [fn("CONVERT", literal("thumbnail USING utf8")), "thumbnail"],
            "deleted",
            "category_id",
            "restaurant_id"
          ]
        }
      ],
      where: {
        restaurant_id: restaurantId
      },
      order: [
        ["name", "ASC"],
        ["products", "price", "ASC"]
      ]
    });
  }

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
