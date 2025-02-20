import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDatailComponent } from './pages/student-datail/student-datail.component';

const routes: Routes = [{
  path: '',
  component: StudentsComponent,
},
{
  path: ':id',
  component: StudentDatailComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
