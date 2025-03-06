import { Injectable } from '@angular/core';
import { LoginPayload } from '../../Modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../Modules/dashboard/Pages/users/models/user';
import { getNextConsecutiveNumber } from '../../shared/utils/util';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.action';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const User_DB: User[] = [
//  {
//    id: getNextConsecutiveNumber(0),
//    email: 'admin@email.com',
//    password: '123456',
//    name: 'Administrador',
//    accessToken: 'djMDFJNdfmvcJKDFdsmd23GFuedsvFGD2d32',
//    role: 'ADMIN',
//  },
//  {
//    id: getNextConsecutiveNumber(1),
//    email: 'employee@email.com',
//    password: '123456',
//    name: 'Empleado',
//    accessToken: 'djMDFJNd3gngh61DFd56hhgfddd23GFue232',
//    role: 'EMPLOYEE',
//  },
//];

@Injectable({ providedIn: 'root' })
export class AuthService {
  //private _authUser$ = new BehaviorSubject<null | User>(null);
  //authUser$ = this._authUser$.asObservable();
  authUser$: Observable<User | null>;

  constructor(private router: Router, private store: Store, private httpClient: HttpClient)
  {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
   // this._authUser$.next(null);
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }

  login(payload: LoginPayload, next?: () => void): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (usersResult) => {
          if (!usersResult[0]) {
            alert('Email o password invalidos');
            return;
          } else {
            // Si login es satisfactorio
            localStorage.setItem('access_token', usersResult[0].accessToken);
            this.store.dispatch(
              AuthActions.setAuthUser({ user: usersResult[0] })
            );
            this.router.navigate(['dashboard', 'home']);
          }

          if (!!next) {
            next();
          }

        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              alert('Problemas para conectar con el servidor');
            }
          }
        },

      });
  }

  //login(payload: LoginPayload): void {
  //  const loginResult = User_DB.find(
  //    (user) =>
  //      user.email === payload.email && user.password === payload.password
  //  );

  //  if (!loginResult) {
  //    alert('Email o password invalidos');
  //    return;
  //  }
  //  localStorage.setItem('access_token', loginResult.accessToken);
  //  this.store.dispatch(AuthActions.setAuthUser({ user: loginResult }))
  //  this._authUser$.next(loginResult);
  //  this.router.navigate(['dashboard', 'home']);
  //}

  isAuthenticated(): Observable<boolean> {
    
    return this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?accessToken=${localStorage.getItem(
          'access_token'
        )}`
      )
      .pipe(
        map((res) => {
          const userResult = res[0];
          if (userResult) {
            this.store.dispatch(AuthActions.setAuthUser({ user: userResult }));
          }
          return !!userResult;
        })
      );
  }


  //isAuthenticated(): Observable<boolean> {
   
    //const storegeUser = User_DB.find(
    //  (x) => x.accessToken === localStorage.getItem('access_token')
    //);

    //if (storegeUser) {
    //  this.store.dispatch(AuthActions.setAuthUser({ user: storegeUser }))
    //}

    //this._authUser$.next(storegeUser || null);
   
    //return this.authUser$.pipe(map((x) => !!x));
  //}
}
