import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [{
  path: 'Login',
  component:LoginComponent,
},
  
{
    path: '**',
    redirectTo: 'Login',
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
