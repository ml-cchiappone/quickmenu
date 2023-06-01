import { Op } from "sequelize";
import Restaurant from "../../domain/repositories/restaurant/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class RestaurantsRepository {
  constructor() {}

  getAll() {
    return Restaurant.findAndCountAll({
      attributes: [
        "id",
        "string_id",
        "name",
        "address",
        "phone_number",
        "logo",
        "banner",
        "lat",
        "lon",
        "province_id",
        "currency_symbol",
        "deleted"
      ],
      include: [
        {
          model: models.province,
          as: "province",
          attributes: ["id", "name", "code"]
        }
      ]
    });
  }

  get(restaurantId: string) {
    return Restaurant.findOne({
      raw: true,
      where: {
        string_id: restaurantId
      }
    });
  }

  update(restaurantId: number, data: any) {
    return Restaurant.update(
      { ...data, string_id: snake_case_string(data.name) },
      {
        where: {
          id: restaurantId
        }
      }
    );
  }

  delete(restaurantId: number) {
    return Restaurant.update(
      { deleted: 1 },
      {
        where: {
          id: restaurantId
        }
      }
    );
  }

  post(data: any) {
    return Restaurant.create({
      ...data,
      string_id: snake_case_string(data.name)
    });
  }

  getOrdersByOrderStatus(restaurantId: string, status: any) {
    console.log(restaurantId);
    console.log(status);
    
    return Restaurant.findAndCountAll({
      attributes: [
        "id",
        "string_id",
        "name",
      ],
      include: [
        {
          model: models.order,
          as: "orders",
          attributes: ["id"],
          include: [
            {
              model: models.table,
              as: "tables",
              attributes: ["description"]
            },
            {
              model: models.order_status,
              as: "order_status",
              attributes: ["status", "status_code"],
              where: {
                status_code: {
                  [Op.eq]: status
                }
              }
            },
            {
              model: models.order_payment_status,
              as: "order_payment_status",
              attributes: ["status", "status_code"]
            }
          ]
        }
      ],
      where: {
        string_id: restaurantId
      }
    });
  }
}

function snake_case_string(str = "") {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((s) => s.toLocaleLowerCase())
    .join("_");
}

export default RestaurantsRepository;
