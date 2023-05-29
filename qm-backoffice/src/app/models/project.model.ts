import { ProjectStateModel } from './project-state.model';
export interface ProjectModel {
    id: number;
    name: string;
    project_user: Array<ProjectUser>;
    project_users: Array<ProjectUser>;
    activities: Array<Activity>;
    completed_percentaje: number;
    completed_activities_length: number;
    activities_length: number;
    preference: Array<any>;
    project_type: {
        description: string;
    };
    project_state: ProjectStateModel
    init_date: Date;
    end_date: Date;
    date_created: Date;
    date_modified: Date;
}

interface ProjectUser {
    id: number;
    review: number;
    user_id?: number
    user: User
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

interface Activity {
    created_by: number;
    state: {
        description: string;
    };
}

