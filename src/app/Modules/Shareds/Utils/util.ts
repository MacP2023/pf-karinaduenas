import { DatePipe } from '@angular/common';

export function getNextConsecutiveNumber(currentNumber:number): number {
  return currentNumber = currentNumber+1;
}


// format date in typescript
export function getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, format);
}
