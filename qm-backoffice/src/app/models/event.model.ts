import { UserModel } from './user.model';
import { HospitalModel } from './hospital.model';
import { HealthCareModel } from './healthcare.model';
import { InstrumentalistModel } from './instrumentalist.model';
import { EventTypeModel } from './event-type.model';
import { ProjectModel } from './project.model';
import { CalendarEvent } from 'angular-calendar';

export interface EventModel {
  id: number;
  title: string;
  description: string;
  init_date: Date;
  end_date: Date;
  color: string;
  editable: boolean;
  all_day: boolean;
  material: string;
  doctor: string;
  remit_number: string;
  bill_number: string;
  patient: string;
  date_created: Date;
  created_by_user: UserModel;
  event_type: EventTypeModel;
  periodicity_type: PeriodicityTypeModel;
  hospital: HospitalModel;
  instrumentalist: InstrumentalistModel;
  healthcare: HealthCareModel;
  dates_excluded: Array<Date>;
  project: ProjectModel;
  rrule?: RecurringEvent;
}

export interface PeriodicityTypeModel {
  id: number;
  description: string;
  code: string;
}

export interface RecurringEvent {
  freq: any;
  bymonth?: number;
  bymonthday?: number;
  byweekday?: any;
}

export interface BioCalendarEvent extends CalendarEvent {
  description: string;
  doctor?: string;
  healthcare?: HealthCareModel;
  instrumentalist?: InstrumentalistModel;
  hospital?: HospitalModel;
  event_type: EventTypeModel;
  patient?: string;
  bill_number?: string;
  material?: string;
  remit_number?: string;
  all_day: boolean;
  editable: boolean;
  periodicity_type: PeriodicityTypeModel;
  init_date: Date;
  end_date: Date;
}
