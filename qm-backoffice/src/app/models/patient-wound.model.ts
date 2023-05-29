export interface PatientWoundModel {
    id: number;
    patient_id: any;
    description: string;
    date_created: Date;
    classification: string;
    injury: string;
    etiology: string;
    exudate: string;
    exudate_amount: string;
    healthy_surrounding_skin: string;
    unhealthy_surrounding_skin: string;
    depth: number;
    length: number;
    width: number;
    odor: boolean;
    pain: number;
    commentary: number;
    nurses: string;
}
