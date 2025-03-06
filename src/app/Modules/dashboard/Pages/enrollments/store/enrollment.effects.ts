import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments';


@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          map((enrollments) =>
            EnrollmentActions.loadEnrollmentsSuccess({ data: enrollments })
          ),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  createEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
   
      ofType(EnrollmentActions.createEnrollment),
    
      concatMap((action) =>
        this.enrollmentsService.createEnrollment(action.data).pipe(
     
          map((enrollment) =>
            EnrollmentActions.createEnrollmentSuccess({ data: enrollment })
          ),
   
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  updateEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.updateEnrollment),

      concatMap((action) =>
        this.enrollmentsService.updateEnrollment(action.data).pipe(

          map((enrollment) =>
            EnrollmentActions.updateEnrollmentSuccess({ data: enrollment })
          ),

          catchError((error) =>
            of(EnrollmentActions.updateEnrollmentFailure({ error }))
          )
        )
      )
    );
  });
  deleteEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.deleteEnrollmentById),

      concatMap((action) =>
        this.enrollmentsService.deleteEnrollmentById(action.id).pipe(

          map((enrollment) =>
            EnrollmentActions.deleteEnrollmentSuccess({ data: enrollment })
          ),

          catchError((error) =>
            of(EnrollmentActions.deleteEnrollmentFailure({ error }))
          )
        )
      )
    );
  });
  constructor(private enrollmentsService: EnrollmentsService) {}
}
