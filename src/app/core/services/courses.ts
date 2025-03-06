import { Injectable } from "@angular/core";
import { Observable, Subscriber,of,delay ,concatMap} from "rxjs";
import { Course } from "../../Modules/dashboard/Pages/courses/models/course";
import { getNextConsecutiveNumber } from "../../Modules/Shareds/Utils/util";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';



//let coursesDBTemp = [
//  {
//    id: getNextConsecutiveNumber(0),
//    name: 'Angular',
//    description: 'Descripcion1',
//    teacher: 'Profesor1',
//    calendar: 'Calendario1',
//    type: 'Virtual',

//  },
//  {
//    id: getNextConsecutiveNumber( 1),
//    name: 'Javscript',
//    description: 'Descripcion' + 1,
//    teacher: 'Profesor' +  1,
//    calendar: 'Calendario' +  1,
//    type: 'Presencial',
//  },
//];

@Injectable({ providedIn: 'root' })

export class CousesServices {

  constructor(private httpClient: HttpClient) { }

  idaux = 0;

  getCourseDetail(id: string): Observable<Course> {
    alert(`${environment.baseApiUrl}/courses/${id}?_embed=teachers`)
    return this.httpClient.get<Course>(
      `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    );
  }

  getCourses(): Observable<Course[]> {
  
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`);


  }

  deleteCoursesById(id: number): Observable<Course[]> {
  
    return (
      this.httpClient
        .delete<Course>(`${environment.baseApiUrl}/courses/${id}`)
        .pipe(concatMap(() => this.getCourses())));

  }

  saveCourse(payload: { name: string, description: string, teacher: string, calendar: string, type: string }): Observable<Course[]> {
   
    return this.httpClient.post<Course[]>(`${environment.baseApiUrl}/courses`, payload)
      .pipe(concatMap(() => this.getCourses()));
    
  }

  updateCourseById(id: number, data: { name: string, description: string, teacher: string, calendar: string, type: string }): Observable<Course[]> {
       return this.httpClient
      .patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()));
  }

}
