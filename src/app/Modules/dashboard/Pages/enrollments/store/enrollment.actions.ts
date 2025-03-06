import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models/enrollment';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Create Enrollment': props<{ data: Omit<Enrollment, 'id'> }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
    'Update Enrollment': props<{ data: Enrollment }>(),
    'Update Enrollment Success': props<{ data: Enrollment }>(),
    'Update Enrollment Failure': props<{ error: unknown }>(),
    'Delete Enrollment By Id': props<{ id: number }>(),
    'Delete Enrollment Success': props<{ data: Enrollment }>(),
    'Delete Enrollment Failure': props<{ error: unknown }>(),
    'Reset State': emptyProps(),
  }
});

