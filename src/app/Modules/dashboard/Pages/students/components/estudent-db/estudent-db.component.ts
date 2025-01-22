import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from './../../models/student';
@Component({
  selector: 'app-estudent-db',
  standalone: false,
  
  templateUrl: './estudent-db.component.html',
  styleUrl: './estudent-db.component.scss'
})
export class EstudentDBComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EstudentDBComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) { }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
