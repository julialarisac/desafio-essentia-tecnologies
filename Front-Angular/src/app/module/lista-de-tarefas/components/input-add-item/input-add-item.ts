import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, input, Output, ViewChild } from '@angular/core';
import { ListaItens } from '../../interface/ListaItens.interface';
import { required } from '@angular/forms/signals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  imports: [NgClass],
  templateUrl: './input-add-item.html',
  styleUrl: './input-add-item.scss',
})
export class InputAddItem {

  #cdr = inject(ChangeDetectorRef);
  @ViewChild("inputText") public inputText !: ElementRef;

  @Input({required: true}) public inputListItems: ListaItens[] = []
  
  @Output() public outputAddListItens = new EventEmitter<ListaItens>()
  public focusAndAddItem(value: string){
    const text = value?.toString().trim();
    if(!text || text.length < 3){
      alert('A tarefa precisa ter no mínimo 3 caracteres.');
      return this.inputText.nativeElement.focus();
    }

    this.#cdr.detectChanges();
    this.inputText.nativeElement.value= ''; //limpando o input

    const id = Date.now();

    this.outputAddListItens.emit({
      id,
      checked: false,
      nomeLista: text,
    })
    console.log(text)
    return this.inputText.nativeElement.focus();
  }
}
