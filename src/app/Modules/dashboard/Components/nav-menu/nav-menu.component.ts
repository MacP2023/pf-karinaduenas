import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {

  linkItems: { label: string; routerLink: string }[] = [
    {
      label: 'Inicio',
      routerLink: 'home',
    },
    {
      label: 'Estudiantes',
      routerLink: 'students',
    },
    {
      label: 'Cursos',
      routerLink: 'courses',
    },
 
    {
      label: 'Inscripciones',
      routerLink: 'enrollments',
    },
    {
      label: 'Usuarios',
      routerLink: 'users',
    },
   
  ];


  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

  //constructor(private router: Router) { }

  //logout(): void {

  //  localStorage.removeItem('token');
  //  this.router.navigate(['auth','login'])

  //}

}
