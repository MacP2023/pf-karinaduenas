import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from '../students/students.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StudentDatailComponent } from './pages/student-datail/student-datail.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDatailComponent,
   
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, MatTableModule, SharedModule, MatDatepickerModule, MatTooltipModule
  ],
  exports: [StudentsComponent
  ],
 
})
export class StudentsModule { }
