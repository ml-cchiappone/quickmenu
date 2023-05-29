import ProvincesRepository from "../../../infraestructure/repositories/provinces";

export default class ProvincesGetAll {
  constructor() {}

  async execute() {
    try {
      return await new ProvincesRepository().getAll();
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:10 ~ ProvincesGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
