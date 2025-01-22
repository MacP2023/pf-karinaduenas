import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaderSize]',
  standalone: false
})
export class HeaderSizeDirective {

  constructor(private elementref: ElementRef) {
    this.elementref.nativeElement.style.fontSize = "20px";
  }

}
