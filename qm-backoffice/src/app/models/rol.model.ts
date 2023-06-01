import { UserModel } from './user.model';

export interface RolModel {
  id: number;
  code: string;
  description: string;
  date_created: Date;
  users_rol?: Array<{
    id: number;
    rol_id: number;
    user: UserModel;
  }>;
}
