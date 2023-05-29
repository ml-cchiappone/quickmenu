import { CountryModel } from './country.model';

export interface ProvinceModel {
  id: number;
  name: string;
  code: string;
  country: Array<CountryModel>;
}
