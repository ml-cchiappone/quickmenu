import { ActivityModel } from './activity.model';

export class Column {
    constructor(
        public id: number,
        public code: string,
        public description: string,
        public color: string,
        public order: number,
        public activitys: Array<ActivityModel>) {}
}