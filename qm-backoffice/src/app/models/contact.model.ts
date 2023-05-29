import { ProvinceModel } from "./province.model";
import { AnnotationModel } from "./annotation.model";
import { ContactInstitutionModel } from "./contact-institution.model";

export interface ContactModel {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  province: ProvinceModel;
  annotations: Array<AnnotationModel>;
  years: number;
  email: string;
  phone_number: string;
  title: string;
  specialty: string;
  contact_institution: ContactInstitutionModel;
  date_created: Date;
  date_modified: Date;
}
