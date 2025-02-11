import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsServices } from '../../../../../../core/services/students';

@Component({
  selector: 'app-student-datail',
  standalone: false,
  
  templateUrl: './student-datail.component.html',
  styleUrl: './student-datail.component.scss'
})
export class StudentDatailComponent {
  studentId: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private  studentsServices:StudentsServices) {
    this.studentId = this.activateRoute.snapshot.params['id'];
  }

}
