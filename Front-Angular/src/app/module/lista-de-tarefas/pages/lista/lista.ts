import { Component, signal, OnInit } from '@angular/core';
import { InputAddItem } from '../../components/input-add-item/input-add-item';
import { ListaItens } from '../../interface/ListaItens.interface';
import { listaTarefa } from '../../../../services/listaTarefa';
import { InputListItem } from '../../components/input-list-item/input-list-item';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-lista',
  imports: [InputAddItem, InputListItem],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {

  public addItem = signal(true);
  public listaIniciada = false;
  public carregando = true;
  public tarefas = signal<ListaItens[]>([]);
  constructor(private listaService: listaTarefa) {}

  async ngOnInit() {
    await this.carregarLista();
  }

public async carregarLista(): Promise<void> {

  const data: ListaItens[] = await firstValueFrom(
    this.listaService.listar()
  );

  this.tarefas.set(
    data.map(t => ({
      ...t,
      checked: !!t.concluida
    }))
  );
}

public async getInputAddItem(item: ListaItens){

  await firstValueFrom(
    this.listaService.adicionar(item.nomeLista)
  );

  await this.carregarLista();
  console.log('POST FEITO');

}

  get pendentes(): ListaItens[] {
  return this.tarefas().filter(t => !t.checked);
  }

  get concluidas(): ListaItens[] {
    return this.tarefas().filter(t => t.checked);
  }

  public async statusTarefa(item: ListaItens){

  await firstValueFrom(
    this.listaService.atualizarStatus(item.id, !item.checked)
  );

  await this.carregarLista();

}
  public async editarNome(item: ListaItens){
  const confirmado = confirm('Tem certeza que deseja alterar este item?');
  if (!confirmado) return;

  await firstValueFrom(
    this.listaService.atualizarNome(item.id, item.nomeLista)
  );

  await this.carregarLista();

}
  public async deletar(itemId: number){
  const confirmado = confirm('Tem certeza que deseja deletar este item?');
  if (!confirmado) return;

  await firstValueFrom(
    this.listaService.deletar(itemId)
  );

  await this.carregarLista();

}
  public async deletarTodosOsItens(){
  const confirmado = confirm('Tem certeza que deseja deletar todos os itens? Esta ação não pode ser desfeita.');
  if (!confirmado) return;

  await firstValueFrom(
    this.listaService.deletarTodos()
  );

  await this.carregarLista();

}
}