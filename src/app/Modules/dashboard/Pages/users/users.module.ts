import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './store/users.reducer';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTableModule,
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([]),
  ]
})
export class UsersModule { }
