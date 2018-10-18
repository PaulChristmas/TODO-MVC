export class Todo {
  id: number;
  name: string;
  done: boolean;
  
  constructor(id: number, name: string) {
    this.name = name;
	this.done = false;
	this.id = id;
  }
}