import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  items = Array<Todo>();
  private id = 0;
  newTodo = '';
  placeholder = 'What should you do?';
  
  constructor() { 
    let persistedTodos = JSON.parse(localStorage.getItem('savedItems') || '[]');
	this.items = persistedTodos.map((todo: {name: string, done: boolean}) => {
	  let ret = new Todo(this.id++, todo.name);
	  ret.done = todo.done;
	  return ret;
	});
	this.id = this.items.length;
  }
  
  saveData(): void {
	  localStorage.setItem('savedItems', JSON.stringify(this.items));
  }
  
  ngOnInit() {
  }
  
  getStatus(done: boolean): string {
	return done? 'undone' : 'done';
  }
  
  setStatus(item: Todo): void {
	item.done = !item.done;
	this.saveData();
  }
  
  findById(id: number): Todo {
	  return this.items.filter((item: Todo) => item.id === id)[0];
  }
  
  createItem(): void {
	var name = this.newTodo.replace(/\s+/g,' ').trim();
	if (name.length > 0) {
		this.add(name);
	}
	this.newTodo = '';
  }
  
  remove(id: number): void {
	let del = this.findById(id);
	let index = this.items.indexOf(del);
	this.items.splice(index, 1);		
	this.saveData();
  }
  
  add(name: string):void {
	this.items.push(new Todo(this.id++, name));
	this.saveData();
  }
}
