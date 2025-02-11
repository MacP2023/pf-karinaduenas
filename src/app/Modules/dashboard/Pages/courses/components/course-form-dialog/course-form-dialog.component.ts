import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-form-dialog',
  standalone: false,
  
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})
export class CourseFormDialogComponent {

  courseForm: FormGroup;
  constructor(private formb: FormBuilder,private matDialogRef: MatDialogRef<CourseFormDialogComponent>  ) {

      this.courseForm = this.formb.group({
      name: [null, [Validators.required, Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.maxLength(400)]],
      teacher: [null, [Validators.required, Validators.maxLength(200)]],
      calendar: [null, [Validators.required, Validators.maxLength(20)]],
      type: [null, [Validators.required, Validators.maxLength(20)]]
      
    })

  }

  onSave() {
   
    if (this.courseForm.invalid) {
     
      this.courseForm.markAllAsTouched;
    }
    else {
     
      this.matDialogRef.close(this.courseForm.value)
    }
  }
}
