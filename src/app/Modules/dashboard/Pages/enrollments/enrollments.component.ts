import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnrollmentActions } from './store/enrollment.actions';
import { Store } from '@ngrx/store';
import { getNextConsecutiveNumber } from '../../../Shareds/Utils/util';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models/enrollment';
import {
  selectEnrollments, selectIsLoadingEnrollments, selectEnrollmentsError
  
} from './store/enrollment.selectors';
import { Student } from '../students/models/student';
import { Course } from '../courses/models/course';
import { CousesServices } from '../../../../core/services/courses';
import { StudentsServices } from '../../../../core/services/students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  //error$: Observable<unknown>;
  
  courses: Course[] = [];
  students: Student[] = [];
  enrollmentForm: FormGroup;
  idEdit: number=0;
  
  displayedColumns = ['id', 'studentId', 'courseId', 'acciones'];
  constructor(private store: Store, private coursesService: CousesServices,
    private studentServices: StudentsServices, private fb: FormBuilder

) {
    this.enrollments$ = this.store.select(selectEnrollments);
  
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
   // this.error$ = this.store.select(selectEnrollmentsError);
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });

    }


  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();
  }

  createEnrollment(): void {
    let cont = 2;
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          courseId: getNextConsecutiveNumber(cont),
          studentId: getNextConsecutiveNumber(cont),
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetState());
  }

  loadStudentsAndCourses(): void {
    forkJoin([
      this.coursesService.getCourses(),
      this.studentServices.getStudent(),
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses;
        this.students = students;
      },
    });
  }

  deleteStudentsAndCoursesById(id: number) {
    this.store.dispatch(
      EnrollmentActions.deleteEnrollmentById({
        id
      })
    );
   // this.usersService.deleteUserById(id);
  }

  updateStudentsAndCourses(id: number, studentID: number, courseID: number) {
    this.idEdit = id;

    this.enrollmentForm.controls['studentId'].setValue(studentID);
    this.enrollmentForm.controls['courseId'].setValue(courseID);
   
  }

  updateStudentsAndCoursesById(data:Enrollment ) {
    this.store.dispatch(
      EnrollmentActions.updateEnrollment({
        data: {
          id: data.id,
          studentId: data.studentId,
          courseId: data.courseId
        }
       
      })
    );
   
  }

  onSubmit(): void {
    let data: Enrollment;
   
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      if (this.idEdit > 0) {
        data= {
          id: this.idEdit,
          studentId: this.enrollmentForm.controls['studentId'].value,
          courseId: this.enrollmentForm.controls['courseId'].value,
        }
       
        this.updateStudentsAndCoursesById(data)
        this.loadStudentsAndCourses();
    }
      else
        this.store.dispatch(
          EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
        );
    }
    
  }


}
