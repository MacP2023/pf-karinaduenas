import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models/enrollment';
import { getNextConsecutiveNumber } from '../../../../Shareds/Utils/util';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[];
  isLoading: boolean;
  error: unknown;

}

export const initialState: State = {
  enrollments: [],
   isLoading: false,
  error: null,

};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => {
    return {
      ...state,
     isLoading:true
    }
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: action.data,
      isLoading: false,
      error: null,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentActions.createEnrollment, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.createEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data],
    };
  }),
  on(EnrollmentActions.createEnrollmentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(EnrollmentActions.updateEnrollment, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.updateEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data],
    };
  }),
  on(EnrollmentActions.updateEnrollmentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentActions.deleteEnrollmentById, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data],
    };
  }),
  on(EnrollmentActions.deleteEnrollmentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollmentActions.resetState, () => initialState),

);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});

