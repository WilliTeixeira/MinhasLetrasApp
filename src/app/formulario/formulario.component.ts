import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from './../services/table.service';
import { Letras } from './../interface/letra.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  titulo: string;
  letraFormulario: FormGroup;
  exibeMsgErroMusica: boolean = false;

  constructor(private formbuilder: FormBuilder,
              public formularioRef: MatDialogRef<FormularioComponent>,
              private tableService: TableService,
              @Inject(MAT_DIALOG_DATA) public data: Letras
  ) { }

  ngOnInit(): void {
  if(!this.data) {
    this.titulo = "Nova Letra";
    this.letraFormulario = this.formbuilder.group({
      musica: ['', [Validators.required]],
      banda: ['', [Validators.required]],
      autor: [''],
      album: [''],
      letra: ['', [Validators.required]]
      });
    } else {
      this.titulo = "Edição de letra";
      this.letraFormulario = this.formbuilder.group({
        id: [this.data.id, [Validators.required]],
        musica: [this.data.musica, [Validators.required]],
        banda: [this.data.banda, [Validators.required]],
        autor: [this.data.autor],
        album: [this.data.album],
        letra: [this.data.letra, [Validators.required]]
        });
      }
  }  

  btnSalvar() {
    if(!this.data) {
      if(this.tableService.existeLetraIgual(this.letraFormulario.value)) {
        this.exibeMsgErroMusica = true;
        setTimeout(()=> this.exibeMsgErroMusica = false ,5000)
      } else {
        this.tableService.addLetra(this.letraFormulario.value);
        this.formularioRef.close();
      }
    } else {
      this.tableService.editarLetra(this.letraFormulario.value);
      this.formularioRef.close();
    }
  }

  btnCancelar(): void {
    this.formularioRef.close();
  }
}
