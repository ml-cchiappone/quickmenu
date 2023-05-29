import Product from "../../domain/repositories/product/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class ProductsRepository {
  constructor() {}

  getAllByCategory(categoryId: number) {
    return Product.findAndCountAll({
      include: [
        {
          model: models.category,
          as: "categories",
          attributes: ["id", "name", "description", "deleted", "restaurant_id"]
        }
      ],
      where: {
        category_id: categoryId
      },
      order: [["name", "ASC"]]
    });
  }

  get(productId: string) {
    return Product.findOne({
      where: {
        id: productId
      }
    });
  }

  update(productId: number, data: any) {
    return Product.update(data, {
      where: {
        id: productId
      }
    });
  }

  delete(productId: number) {
    return Product.update(
      { deleted: 1 },
      {
        where: {
          id: productId
        }
      }
    );
  }

  post(data: any) {
    return Product.create(data);
  }
}

export default ProductsRepository;
