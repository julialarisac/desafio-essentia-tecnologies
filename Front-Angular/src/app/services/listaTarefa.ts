import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaItens } from '../module/lista-de-tarefas/interface/ListaItens.interface';

export interface ListaItem {
  id: number;
  nomeLista: string;
}

@Injectable({
  providedIn: 'root',
})
export class listaTarefa {
  private api = "http://localhost:3000/lista";

    constructor(private http: HttpClient) {}

  adicionar(nomeLista: string){
    return this.http.post(this.api, { nomeLista })
  }

  listar(){
  return this.http.get<ListaItens[]>(this.api);
  }

  atualizarStatus(id: number, concluida: boolean){
  return this.http.put(`${this.api}/${id}`, { concluida });
  }
  
  atualizarNome(id: number, nomeLista: string){
    return this.http.put(`${this.api}/${id}`, { nomeLista });
  }
  
  deletar(id: number){
  return this.http.delete(`${this.api}/${id}`)
}
  
  deletarTodos(){
  return this.http.delete(this.api)
}
}
