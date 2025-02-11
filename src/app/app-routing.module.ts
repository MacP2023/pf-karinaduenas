import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { LoginComponent } from './Modules/auth/Login/login.component';


const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  loadChildren: () =>import('./Modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
},
 {
   path: 'auth/login',
   component:LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
