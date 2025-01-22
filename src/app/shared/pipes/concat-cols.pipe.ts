import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../Modules/dashboard/Pages/students/models/student';

@Pipe({
  name: 'concatCols',
  standalone: false
})
export class ConcatColsPipe implements PipeTransform {

  transform(value: Student, separator: ',' | ';', type?: 'uppercase' | 'lowercase', typecol?:1|2): string {

    let valueaux;
    let result;
    valueaux = value;
    let col2 = valueaux.name
    let col1 = valueaux.lastname
    if (typecol === 1)
      if (type === 'uppercase')
        col1 = col1.toUpperCase();
      else
        col1 = col1.toLowerCase();
    else if (typecol === 2)
      if (type === 'uppercase')
        col2 = col2.toUpperCase();
      else
        col2 = col2.toLowerCase();
    result = col1 + separator + col2
    return result;
  }

}
