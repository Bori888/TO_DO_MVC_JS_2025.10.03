export default class ToDoModell {
  constructor() {
    this.todos = [];
  }

  hozzaad(tetel) {
    this.todos.push(tetel);
  }

  osszesElem() {
    return this.todos;
  }
}
