import { Injectable } from "@angular/core";
import { Observable, Subscriber,of,delay } from "rxjs";
import { Course } from "../../Modules/dashboard/Pages/courses/models/course";
import { getNextConsecutiveNumber } from "../../Modules/Shareds/Utils/util";

let coursesDBTemp = [
  {
    id: getNextConsecutiveNumber(0),
    name: 'Angular',
    description: 'Descripcion1',
    teacher: 'Profesor1',
    calendar: 'Calendario1',
    type: 'Virtual',

  },
  {
    id: getNextConsecutiveNumber( 1),
    name: 'Javscript',
    description: 'Descripcion' + 1,
    teacher: 'Profesor' +  1,
    calendar: 'Calendario' +  1,
    type: 'Presencial',
  },
];

@Injectable({ providedIn: 'root' })

export class CousesServices {
  idaux = 0;

  

  getCourses(): Observable<Course[]> {
    
      return of([...coursesDBTemp]).pipe(delay(300));

  }

  deleteCoursesById(id: number): Observable<Course[]> {
    coursesDBTemp = coursesDBTemp.filter((eslim) => eslim.id != id);
    return this.getCourses();
  }

  saveCourse(payload: { name: string, description: string, teacher: string, calendar: string, type: string }): Observable<Course[]> {
    coursesDBTemp.push({
      id: getNextConsecutiveNumber(coursesDBTemp.length),
      ...payload,
    })

    return this.getCourses();
    
  }
}
