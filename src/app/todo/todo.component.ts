import { Component, OnInit } from '@angular/core';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;

  constructor(private todoService: TodoService) { }

  getTodos() {
    return this.todoService.get()
      .then( todos => { this.todos = todos;
                        this.activeTasks = this.todos.filter( todo => !todo.isDone ).length;
    } );
  }

  addTodo() {
    this.todoService.add({ title: this.newTodo, isDone: false})
      .then( () => this.getTodos())
      .then( () => { this.newTodo = ''; } );
  }

  ngOnInit() {
    this.getTodos();
  }

}
