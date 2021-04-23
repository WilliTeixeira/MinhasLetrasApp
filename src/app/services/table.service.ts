import { EventEmitter, Injectable } from '@angular/core';
import { Letras }  from './../interface/letra.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  id: number = 0
  baseLetras: Letras[] =  []

  emitirLetra = new EventEmitter<Letras[]>()

  constructor() { }

  getLetras(): Letras[] {
    return this.baseLetras;
  }

  existeLetraIgual(letra: Letras): boolean {
    const existeLetra = this.baseLetras.findIndex((letraBase) => letraBase.musica === letra.musica)
    return existeLetra != -1 ? true : false;
  }  

  addLetra(novaLetra: Letras): void {
    this.id = this.id + 1;
    novaLetra.id = this.id;
    this.baseLetras = this.baseLetras.concat(novaLetra);
    this.emitirLetra.emit(this.baseLetras);
  }

  editarLetra(letras: Letras): void {
    const indice = this.baseLetras.findIndex(letra => letra.id == letras.id)  
    this.baseLetras[indice] = letras;
    this.emitirLetra.emit(this.baseLetras);
  }

  excluirLetra(id: number): void {
    const novaBase = this.baseLetras.filter(letra => letra.id != id)
    this.baseLetras = novaBase;
    this.emitirLetra.emit(novaBase);
  } 
}