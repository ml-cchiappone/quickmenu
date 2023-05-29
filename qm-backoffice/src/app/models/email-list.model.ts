import { ContactModel } from './contact.model';

export interface EmailListModel {
  id: number;
  sent: number;
  retries: number;
  to: ContactModel;
  date_created: Date;
  date_modified: Date;
}
