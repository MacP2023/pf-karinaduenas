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
  error$: Observable<unknown>;

  courses: Course[] = [];
  students: Student[] = [];
  enrollmentForm: FormGroup;

  
  displayedColumns = ['id', 'studentId', 'courseId', 'acciones'];
  constructor(private store: Store, private coursesService: CousesServices,
    private studentServices: StudentsServices, private fb: FormBuilder

) {
    this.enrollments$ = this.store.select(selectEnrollments);
  
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
    this.error$ = this.store.select(selectEnrollmentsError);
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
  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
      );
    }
  }


}
