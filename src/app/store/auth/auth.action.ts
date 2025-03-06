import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../Modules/dashboard/Pages/users/models/user';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
  
    'set auth user': props<{ user: User }>(),

    'unset auth user': emptyProps(), // Esta accion no recibe datos
  },
});
