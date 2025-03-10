import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatColsPipe } from './pipes/concat-cols.pipe';
import { HeaderSizeDirective } from './directives/header-size.directive';
import { MatListModule } from '@angular/material/list';
import { getNextConsecutiveNumber } from './utils/util';
import { MatTableModule } from '@angular/material/table';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ConcatColsPipe,
    HeaderSizeDirective
  ],
  imports: [
    CommonModule,
   
  ],
  exports: [ConcatColsPipe, HeaderSizeDirective, MatListModule, MatTableModule, MatInputModule, MatSelectModule, MatRadioModule, MatTooltipModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule]
})
export class SharedModule { }
