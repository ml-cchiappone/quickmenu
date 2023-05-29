import { UserModel } from './user.model';

export interface CommentaryModel {
    id?: number;
    user_id: string;
    commented_by: UserModel;
    activity_id: number;
    text: string;
    reply_to?: number;
    show_icon: boolean;
    count_reply?: number;
    replies?: Array<CommentaryModel>
    date_comment?: string;
    text_edit?: boolean;
    date_created: Date;
    date_modified: Date;
}