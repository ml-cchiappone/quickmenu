export interface UserModel {
  id: number;
  email: string;
  password: string;
  date_created: Date;
  date_modified: Date;
  deleted: Boolean;
  token: string;
  user_rol: Array<roles>;
  last_connection: Date;
  employee_category?: string;
  restaurants: Array<resturant>;
}

interface roles {
  id: number;
  date_created: string;
  rol: rol;
}

interface rol {
  id: number;
  description: string;
  code: string;
  icon: string;
}
interface resturant {
  id: number;
  string_id: string;
  name: string;
}
