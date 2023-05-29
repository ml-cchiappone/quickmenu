import { UserModel } from './user.model';
import { EmailListModel } from './email-list.model';

export interface EmailModel {
  id: number;
  subject: string;
  text: string;
  attachments: string | null;
  sender: UserModel;
  mail_list: Array<EmailListModel>;
  date_created: Date;
  date_modified: Date;
}

export interface ReceiverListModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
