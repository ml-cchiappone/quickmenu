import { UserModel } from './user.model';

export interface ProjectUserModel {
    id?: number;
    user_id: number;
    project_id: number;
    review?: number;
    user?: UserModel;
    date_created?: Date;
    date_modified?: Date;
}