import { Component, OnInit } from '@angular/core';
import { TableService } from  './../services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './../formulario/formulario.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  btnNovaLetra(): void{
    //this.tableService.addLetra();
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '500px',
      height: '1200px'
    });
      
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}



