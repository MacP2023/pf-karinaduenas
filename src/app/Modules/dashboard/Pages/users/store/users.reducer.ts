import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { User } from '../models/user';


export const usersFeatureKey = 'users';

export interface State {
  users: User[];

}

export const initialState: State = {
  users: [],

};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => {
    return {
      ...state,
      users: [
        {
          id: 1,
          name: 'Marcos Perez',
          accessToken: 'kjlkllll',
          email: 'email@mail.com',
          password: '123456',
          role: 'ADMIN',
        },
        {
          id: 2,
          name: 'Ernesto  Marquez',
          accessToken: 'asdasdas',
          email: 'email2@mail.com',
          password: '123456',
          role: 'EMPLOYEE',
        },
      ],
    };
  }),
  on(UsersActions.deleteUserById, (state, action) => {
    return {
      // Un nuevo estado en el cual debemos eliminar el usuario con id que recibimos en la accion
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UsersActions.resetState, () => initialState)


);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

