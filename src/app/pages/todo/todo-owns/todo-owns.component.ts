import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-owns',
  templateUrl: './todo-owns.component.html',
  styleUrls: ['./todo-owns.component.css']
})
export class TodoOwnsComponent implements OnInit {

  public todos: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.getTodos();
  }

  private async getTodos(): Promise<any> {
    //this.todos = await this.todosService.getAll();
  }

}
