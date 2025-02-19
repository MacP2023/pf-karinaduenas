import { Component, OnDestroy, OnInit } from '@angular/core';
import { CousesServices } from '../../../../core/services/courses';
import {
  concatMap,
  filter,
  first,
  forkJoin,
  interval,
  map,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { Course } from './models/course';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: false,
  
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] = [];
  isLoading = true;
  hasError = false
  coursesSubscription?: Subscription;
  constructor(private coursesServices: CousesServices , private matDialog: MatDialog) { }

  ngOnInit(): void {
   
    this.loadCourses()
 

  }
  loadCourses(): void {
    this.isLoading = true;
    this.coursesSubscription = this.coursesServices.getCourses()
      .pipe(take(3))
      .subscribe({
        next: (coursesList) => {
          this.coursesList = [...coursesList];
        },
        error: (error) => {
          alert(error);
          this.hasError = true;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }

      });
  }

  openFormDialog(editcourse?:Course) {
   
    this.matDialog.open(CourseFormDialogComponent, { data: { editcourse }})
      .afterClosed().subscribe({
        next: (data) => {
          if (!!data) {
            if (!!editcourse) {
             
              this.updateCourse(editcourse.id, data);
            } else {
           
               this.addCourse(data);
            }
          }
        },
      });

  }

  handleCoursesUpdate(data: Course[]): void {
    this.coursesList = [...data];
  }

  addCourse(course: { name: string, description: string, teacher: string, calendar: string, type: string }): void {
    this.isLoading = true;
    this.coursesServices.saveCourse(course).subscribe({
      next: (course) => this.handleCoursesUpdate(course),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  onCreate() {

    this.openFormDialog()
  }

  onEdit(course:Course) {
   alert('En construcción')
  }

  updateCourse(id: number, data: { name: string, description: string, teacher: string, calendar: string, type: string }) {
    this.isLoading = true;
    this.coursesServices.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }


  onDelete(id: number) {
    if (confirm('Esta seguro de eliminar el curso')) {
      this.coursesServices.deleteCoursesById(id).subscribe({
        next: (coursesList) => { this.coursesList = [...coursesList]; }
      
      })
    }
  }

}
