import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChildren, QueryList } from '@angular/core';
import { ListaItens } from '../../interface/ListaItens.interface';


@Component({
  selector: 'app-input-list-item',
  templateUrl: './input-list-item.html',
  styleUrl: './input-list-item.scss',
})
export class InputListItem {

  #cdr = inject(ChangeDetectorRef);

  @ViewChildren('inputValue') inputs!: QueryList<ElementRef>;

  @Input({required: true}) public inputListItem: ListaItens[] = [];
  @Output() outputAddListItens = new EventEmitter<ListaItens>();
  @Output() outputStatus = new EventEmitter<ListaItens>();
  @Output() outputDelete = new EventEmitter<number>();
  @Output() outputEdit = new EventEmitter<ListaItens>();

  private _editLocks = new Set<number>();

  focusAndAddItem(nomeLista: string){
    const text = nomeLista?.toString().trim();
    if(!text || text.length < 3){
      alert('A tarefa precisa ter no mínimo 3 caracteres.');
      // focus the first input field if available
      const first = this.inputs.first;
      if (first) first.nativeElement.focus();
      return;
    }

    this.outputAddListItens.emit({
      nomeLista: text,
      checked: false
    } as ListaItens);

    // clear the last focused input if available
    const first = this.inputs.first;
    if (first) {
      first.nativeElement.value = '';
      first.nativeElement.focus();
    }
  }

  public onEdit(item: ListaItens, newValue: string){
    if (this._editLocks.has(item.id)) return;

    const text = newValue?.toString().trim();
    if(!text || text.length < 3){
      alert('A tarefa precisa ter no mínimo 3 caracteres.');
      // restore original value in the corresponding input
      const el = this.inputs.find(e => e.nativeElement.id == item.id);
      if (el) {
        el.nativeElement.value = item.nomeLista;
        el.nativeElement.focus();
      }
      return;
    }

    if(text === item.nomeLista) return;

    // lock edits for this item briefly to avoid duplicate events (blur + enter)
    this._editLocks.add(item.id);
    setTimeout(() => this._editLocks.delete(item.id), 700);

    this.outputEdit.emit({
      ...item,
      nomeLista: text,
    });
  }

}
