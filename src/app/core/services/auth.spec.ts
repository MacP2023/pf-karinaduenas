import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { User } from '../../Modules/dashboard/Pages/users/models/user';
import { Router } from '@angular/router';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MockProvider } from 'ng-mocks';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  const initialState = {
    auth: {
      authUser: null,
    },
  };

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router),
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    localStorage.clear();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('AuthService debe instanciarse', () => {
    expect(authService).toBeTruthy();
  });

  it('Un login satisfactorio, debe establecer el usuario autenticado, debe establecer el access token en localStorage, debe redirigir al home', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    const fakeLoginData = {
      email: 'admin@email.com',
      password: '123456',
    };
    const mockResponse: User[] = [
      {
        id: 784788,
        accessToken: 'kjuytresh',
        email: 'pepe@mail.com',
        name: 'fake_user',
        password: '123456',
        role: 'ADMIN',
      },
    ];

    authService.login(fakeLoginData, () => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
      expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    });


    //authService.login({
    //  email: 'admin@email.com',
    //  password: '123456',
    //});

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(mockResponse);


    //authService.authUser$.subscribe({
    //  next: (authUser) => {
    //    expect(authUser).toBeTruthy();
    //    expect(localStorage.getItem('access_token')).toBeTruthy();
    //    expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    //  },
    //});
  });
});
