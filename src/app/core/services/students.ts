import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { Student } from "../../Modules/dashboard/Pages/students/models/student";
import { getNextConsecutiveNumber } from "../../Modules/Shareds/Utils/util";
import { getFormatedDate } from "../../Modules/Shareds/Utils/util";
@Injectable({ providedIn: 'root' })
export class StudentsServices {
  idaux = 0;
  
  getStudent(): Observable<Student[]> {
  
    return new Observable<Student[]>((subscriber) => {
      const students = [
        {
          id: 1,
          name: 'Karina',
          lastname: 'Dueñas',
          dni: 12545789,
          birthdate: new Date('07/10/80'),
          sex: 'F',
          address: 'Mi direccion Peru',
          email: 'karina@duenas.com',
          cel: '051-87555555'
        },
        {
          id: 2,
          name: 'Mayra',
          lastname: 'Perez',
          dni: 56464666,
          birthdate: new Date('20/11/86'),
          sex: 'F',
          address: 'Mi direccion Lima',
          email: 'mayra@perez.com',
          cel: '051-87555555'
        },
        {
          "id": 3,
          "name": 'Pedro',
          "lastname": 'Main',
          "dni": 1763543,
          "birthdate": new Date('01/09/74'),
          "sex": 'M',
          "address": 'Mi direccion Lima',
          "email": 'pedroa@perez.com',
          "cel": '051-87555555'
        }
      ];

      setInterval(() => {
        students.push({
          id: getNextConsecutiveNumber(students.length),
          name: 'NUEVO',
          lastname: 'ESTUDIENTE ' + students.length,
          dni: 5646466 + students.length,
          birthdate: new Date('20/11/86'),
          sex: 'F',
          address: 'Mi direccion Lima' + students.length,
          email: 'mayra@perez' + students.length + '.com',
          cel: '051-87555555'
        });

        // Emitimos los estudiantes
        subscriber.next(students);

        // subscriber.error('Error al cargar estudiantes'); // Enviar un error a los subscriptores
        if (students.length === 4) {
          subscriber.complete(); // Notifica al subscritor/es que este obs ya no va a emitir mas datos
        }
      }, 1000);
    });

    
  }
}
