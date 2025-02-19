import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { LoginComponent } from './Modules/auth/Login/login.component';
import { authGuard } from './core/guards/auth.guard'

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard],
  loadChildren: () =>import('./Modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
},
{

  path: 'auth',
  loadChildren: () => import('./Modules/auth/auth.module').then((m) => m.AuthModule),
   //path: 'auth/login',
   //component:LoginComponent,
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

