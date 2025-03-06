
import { Component, OnInit } from '@angular/core';
import { CousesServices } from '../../../../../../core/services/courses';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../courses/models/course';
import { AuthService } from '../../../../../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  isLoading = false;
  course: Course | null = null;
  errorMessage = '';
  displayedColumns = ['id', 'name', 'lastnme', 'acciones'];
  isAdmin$: Observable<boolean>;
  constructor(
    private coursesService: CousesServices,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { this.isAdmin$ = this.authService.isAdmin$; }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getCourseDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
        
          this.course = course;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El curso/profesor no existe';
            }
          }
        },
      });
  }
}
