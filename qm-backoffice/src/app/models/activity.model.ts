import { ProjectStateModel } from './project-state.model';

export interface ActivityModel {
    id?: number;
    title: string;
    description: string;
    priority?: number;
    weight?: number;
    order?: number;
    binary_state?: boolean;
    state: {
        id: number;
        description: string;
        code: string;
    }
    type: {
        id: number;
        description: string;
        code: string;
    }
    activity_type_id?: number;
    project: {
        id: number;
        name: string;
        state: ProjectStateModel;
    }
    commentary: Array<any>;
    project_id: number;
    created_by: number;
    activity_user: Array<ActivityUser>;
    activity_users : Array<ActivityUser>;
    init_date_event?: Date;
    end_date_event?: Date;
    date_created: Date;
    date_modified: Date;
}

interface ActivityUser {
    id: number;
    user: User;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    picture: string;
    last_connection: Date;
    user_log: {
        id: number;
        last_action: string;
        date_last_action: Date;
    }
}