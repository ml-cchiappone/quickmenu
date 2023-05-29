export interface PatientVisitModel {
    id: number;
    commentary: string;
    date_created: Date;
    date_next_visit: Date;
    medicines: string;
    nurses: string;
    patient: Patient;
    patient_status: string;
    patient_visit_upload: Array<ImageUpload>;
    supplies: string;
}

interface ImageUpload {
    patient_visit_id: number;
    path: string;
    date_created: Date;
}

interface Patient {
    id: number;
    name: string;
    last_name: string;
}