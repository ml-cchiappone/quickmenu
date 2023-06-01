import OrderStatus from "../../domain/repositories/order_status/model";

class OrderStatusRepository {
  constructor() {}

  get(statusCode: string) {
    return OrderStatus.findOne({
      where: {
        status_code: statusCode
      }
    });
  }
}

export default OrderStatusRepository;
