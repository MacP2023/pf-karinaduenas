
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../Modules/dashboard/Pages/users/store/users.actions';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) { }


  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  deleteUserById(id: number) {
    this.store.dispatch(UsersActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UsersActions.resetState());
  }

}
