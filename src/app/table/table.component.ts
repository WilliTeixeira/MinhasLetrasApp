import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TableService } from './../services/table.service';
import { Letras } from './../interface/letra.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';
import { FormularioComponent } from './../formulario/formulario.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'musica', 'banda', 'opcoes'];
  dataSource: Letras[] = [];
  @ViewChild('tabela') tabelaFormularioRef: MatTable<Letras>;

  constructor(private tableservice: TableService,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = this.tableservice.getLetras();
    this.tableservice.emitirLetra.subscribe(novaletra => {
      this.dataSource = novaletra;
      this.tabelaFormularioRef.renderRows();
    })
  }

  btnEditarLetra(letra: Letras){
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '500px',
      height: '1200px',
      data: letra
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  btnExcluirLetra(letra: Letras): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: letra
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
