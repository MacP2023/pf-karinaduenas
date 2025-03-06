import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from "../../models/course";
import { AuthService } from '../../../../../../core/services/auth';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-courses-table',
  standalone: false,
  
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
  @Input()
  coursesList: Course[] = [];
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  edit = new EventEmitter<Course>();

  displayedColumns = ['id', 'name', 'description', 'teacher', 'calendar', 'type','acciones'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  //onConstruc() {
  //  alert('En construccion');
  //}
}
