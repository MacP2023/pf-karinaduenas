import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './Components/menu/menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StudentsModule } from './Pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    NavMenuComponent,
   
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    StudentsModule,
    SharedModule,
   
  ],
    exports:[DashboardComponent],
})
export class DashboardModule { }
