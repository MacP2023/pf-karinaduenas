import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models/student';
import { getNextConsecutiveNumber } from '../../../Shareds/Utils/util';
import { SelectionChange } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-students',
  standalone: false,
  providers: [provideNativeDateAdapter()],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'

})
export class StudentsComponent {
  estudentForm: FormGroup;
  studentList: Student[] = [];
  displayedColumns: string[] = ['id', 'dni', 'name', 'email', 'acciones'];
  name = '';
  id = 0;
  lastname = '';
  dni = '';
  birthdate = '';
  sex = '';
  address = '';
  email = '';
  cel = '';
  date = new Date();

  constructor(private fb: FormBuilder) {
    this.estudentForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(200)]],
      lastname: [null, [Validators.required, Validators.maxLength(200)]],
      dni: [null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      birthdate: [null, [Validators.required]],
      sex: [null],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      cel: [null, [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      date: new Date(),
    })

  }


  onSubmit() {
    console.log(this.estudentForm.invalid)
    if (this.estudentForm.invalid) {
      this.estudentForm.markAllAsTouched;
      alert('Existen datos Invalidos');
    }
    else {
      console.log(this.id)
    
      if (this.id == 0) {
        let idaux = 0; 
        if (this.studentList.length>0)
          idaux = this.studentList[this.studentList.length - 1].id;
       
        this.studentList = [...this.studentList, { id: getNextConsecutiveNumber(idaux), ...this.estudentForm.value, }]
      }
        else {
        this.studentList = this.studentList.filter((eslim) => eslim.id != this.id);
        console.log(this.studentList);
        this.studentList = [...this.studentList, { id: this.id, ...this.estudentForm.value, }];
        console.log(this.studentList);
        this.studentList.sort(function (a, b) {
          // A va primero que B
          if (a.id < b.id)
            return -1;
          // B va primero que A
          else if (a.id > b.id)
            return 1;
          // A y B son iguales
          else
            return 0;
        });
        
      }
   
    }
    this.estudentForm.reset();
  
    
  }
  onDelete(id:number) {
    if (confirm('Esta seguro de eliminar al estudiante')) {
      this.studentList = this.studentList.filter((eslim) => eslim.id != id);
    }
  }

  onEdit(id: number) {
    
    console.log(id);
    console.log(this.studentList.filter((eslim) => eslim.id == id));
    let StudentForm = this.studentList.filter((eslim) => eslim.id == id);
    this.name = StudentForm.map(item => { return item.name }).toString();
    this.lastname = StudentForm.map(item => { return item.lastname }).toString();
    this.birthdate = StudentForm.map(item => { return item.birthdate }).toString();
    this.address = StudentForm.map(item => { return item.address }).toString();
    this.cel = StudentForm.map(item => { return item.cel }).toString();
    this.dni = StudentForm.map(item => { return item.dni }).toString();
    this.email = StudentForm.map(item => { return item.email }).toString();
    this.sex = StudentForm.map(item => { return item.sex }).toString();
    this.id = id;
    this.date = new Date(this.birthdate);
    
  }

  onConstruc() {
    alert('En construccion');
  }
  
}
