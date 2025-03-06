import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { selectUsers } from './store/users.selectors';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  isAdmin$: Observable<boolean>;

  users$: Observable<User[]>;
  displayedColumns = ['name', 'email', 'role','acciones'];
 
  constructor(private usersService: UsersService, private store: Store, private authService: AuthService) {
    this.users$ = this.store.select(selectUsers);
    this.isAdmin$ = this.authService.isAdmin$;
  }
 
  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  deleteUserById(id: number) {
    this.usersService.deleteUserById(id);
  }

  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }


}
