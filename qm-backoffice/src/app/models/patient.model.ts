import { InstrumentalistModel } from "./instrumentalist.model";

export interface PatientModel {
    id?: number;
	name: string;
	last_name: string;
	status: string;
	identification_number: string;
	healthcare: string;
	affiliate_number: string;
	address: string;
	phone_number: string;
	email: string;
	diagnosis: string;
	surgery_date: Date;
	institution: InstrumentalistModel;
	starter_kit: boolean;
	surveyed: boolean;
	doctor: string;
	comorbidity: string;
	mobility: string;
	hemodialysis_date: Date;
	machine_number: string;
	date_created: Date;
	date_modified: Date;
    patient_nurses: Array<PatientNurse>;
	patient_wounds: Array<Wounds>;
	patient_accompanist: PatientAccompanist;
	patient_medicines: Array<Medicine>
	patient_supplies: Array<Supllie>
}
interface Medicine {
    id: number;
    amount: string;
    brand: string;
    measure: string;
    name: string;
}

interface Supllie {
    id: number;
    amount: string;
    brand: string;
    code: string;
    name: string;
}

interface PatientNurse {
    id: number;
    nurse: User
}
interface PatientAccompanist {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    relationship: string;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
	email: string;
    picture: string;
}

interface Wounds {
	classification: string;
	depth: number;
	etiology: string;
	exudate: string;
	exudate_amount: string;
	healthy_surrounding_skin: string;
	id: number;
	injury: string;
	length: number;
	odor: boolean;
	pain: number;
	unhealthy_surrounding_skin: string;
	width: string;
}