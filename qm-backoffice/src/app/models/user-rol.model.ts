export interface UserRolModel {
  id: number;
  user_id: number;
  rol_id: number;
  date_created: Date;
}

export enum AvailableRoles {
  admin = 'admin',
  project = 'project',
  nurse = 'nurse',
  contact = 'contact',
  calendar = 'calendar'
}
