export interface ProjectSummaryModel {
    results: {
        defined: number;
        in_action: number;
        on_hold: number;
        to_evaluate: number;
        completed: number;
        cancelled: number;
        total: number;
    };
}