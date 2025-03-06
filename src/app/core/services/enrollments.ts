import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../Modules/dashboard/Pages/enrollments/models/enrollment';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) { }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseApiUrl}/enrollments`
    );
  }

  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseApiUrl}/enrollments`,
      data
    );
  }

  updateEnrollment(data: Enrollment): Observable<Enrollment> {
    return this.httpClient.put<Enrollment>(
      `${environment.baseApiUrl}/enrollments/` + data.id,
      data
    );
  }

  deleteEnrollmentById(id: number): Observable<Enrollment> {
    return this.httpClient.delete<Enrollment>(
      `${environment.baseApiUrl}/enrollments/` + id
    );
  }
}
