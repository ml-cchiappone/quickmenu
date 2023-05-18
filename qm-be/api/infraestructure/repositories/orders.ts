import { fn, literal } from "sequelize";
import Order from "../../domain/repositories/order/model";
import OrderProduct from "../../domain/repositories/order_product/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class OrdersRepository {
  constructor() {}

  async post(data: any) {
    const transaction = await sequelize.transaction();
    const { order, products_order } = data;
    try {
      // TODO: tipar
      const createdOrder = await Order.create(order, {
        transaction
      });
      const producsts = products_order.map((product: { product_id: any }) => {
        return {
          product_id: product.product_id,
          order_id: createdOrder.dataValues.id
        };
      });

      await OrderProduct.bulkCreate(producsts, {
        transaction
      });

      await transaction.commit();
      return createdOrder;
    } catch (error) {
      await transaction.rollback();
    }
  }
  get(orderId: number) {
    return Order.findOne({
      attributes: ["id"],
      include: [
        {
          model: models.restaurant,
          as: "restaurants",
          attributes: ["id", "string_id", "name"]
        },
        {
          model: models.table,
          as: "tables",
          attributes: ["id", "description"]
        },
        {
          model: models.order_status,
          as: "order_status",
          attributes: ["id", "status"]
        },
        {
          model: models.order_payment_status,
          as: "order_payment_status",
          attributes: ["id", "status"]
        },
        {
          model: models.order_product,
          as: "order_products",
          include: [
            {
              model: models.product,
              as: "products",
              attributes: [
                "id",
                "name",
                "description",
                [fn("CONVERT", literal("thumbnail USING utf8")), "thumbnail"],
                "price"
              ]
            }
          ]
        }
      ],
      where: {
        id: orderId
      }
      // order: [
      //   ["name", "ASC"],
      //   ["products", "price", "ASC"]
      // ]
    });
  }
}

export default OrdersRepository;
