import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { TableService } from '../services/table.service';
import { Letras } from './../interface/letra.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  letra: Letras;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Letras,
             private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.letra = this.data;
  }

  btnConfirmar(): void {
    this.tableService.excluirLetra(this.letra.id);
    this.dialogRef.close();
  }

  btnCancelar(): void {
    this.dialogRef.close();
  }

}
