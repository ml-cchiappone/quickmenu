import { Column } from './column-activity.model';

export class Board {
    constructor(
        public name: string, 
        public columns: Column[]
    ) {}
}