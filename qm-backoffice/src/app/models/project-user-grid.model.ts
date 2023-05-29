import { ProjectUserModel } from './project-user.model';

export interface ProjectUserGridModel {
    paging: {
        total: number;
    };
    results: Array<project>;
}

interface project {
    id: number;
    name: string;
    project_user: Array<ProjectUserModel>;
}