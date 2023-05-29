export interface AlertModel {
  id: number;
  read: boolean;
  title: string;
  message: string;
  entity_id: number;
  event: string;
  parent_entity_id: number;
  date_created: Date;
  user_emit: { 
    id: number;
    email: string;
    picture: string;
  };
}