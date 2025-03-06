import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Delete User By Id': props<{ id: number }>(),
    'Reset State': emptyProps(),
    
  }
});
