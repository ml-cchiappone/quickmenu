import Table from "../../domain/repositories/table/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class TablesRepository {
  constructor() {}

  getAllByRestaurant(restaurantId: number) {
    return Table.findAndCountAll({
      include: [
        {
          model: models.restaurant,
          as: "restaurant",
          attributes: ["id", "string_id", "name", "deleted"]
        }
      ],
      where: {
        restaurant_id: restaurantId
      },
      order: [["description", "ASC"]]
    });
  }

  get(tableId: string) {
    return Table.findOne({
      where: {
        id: tableId
      }
    });
  }

  update(tableId: number, data: any) {
    return Table.update(data, {
      where: {
        id: tableId
      }
    });
  }

  delete(tableId: number) {
    return Table.update(
      { deleted: 1 },
      {
        where: {
          id: tableId
        }
      }
    );
  }

  post(data: any) {
    return Table.create(data);
  }
}

export default TablesRepository;
