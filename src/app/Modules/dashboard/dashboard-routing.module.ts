import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './Pages/home/home.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./Pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./Pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./Pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./Pages/teachers/teachers.module').then((m) => m.TeachersModule),
  },
   {
    path: 'enrrolments',
    loadChildren: () =>
      import('./Pages/enrollments/enrollments.module').then((m) => m.EnrollmentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
