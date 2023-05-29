import sequelize from "../persistence/mysql.config";
import Province from "../../domain/repositories/province/model";
const models = sequelize.models;
class ProvincesRepository {
  constructor() {}

  getAll() {
    return Province.findAndCountAll();
  }
}

export default ProvincesRepository;
