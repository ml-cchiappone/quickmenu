import { UserModel } from "./user.model";
export interface AnnotationModel {
  id: number;
  title: string;
  text: string;
  user_id: number;
  user: UserModel;
  date_created: Date;
  date_modified: Date;
}
