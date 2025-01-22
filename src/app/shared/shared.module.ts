import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatColsPipe } from './pipes/concat-cols.pipe';
import { HeaderSizeDirective } from './directives/header-size.directive';



@NgModule({
  declarations: [
    ConcatColsPipe,
    HeaderSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ConcatColsPipe, HeaderSizeDirective]
})
export class SharedModule { }
