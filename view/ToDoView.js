export default class ToDoView {
  constructor() {
    this.inputElem = document.getElementById("todo-input");
    this.listElem = document.getElementById("todo-list");
    this.addButton = document.getElementById("add-button");
  }

  getInputErtek() {
    return this.inputElem.value.trim();
  }

  inputTorles() {
    this.inputElem.value = "";
  }

  megjelenitListat(lista) {
    this.listElem.innerHTML = "";
    lista.forEach((elem) => {
      const li = document.createElement("li");
      li.textContent = elem;
      this.listElem.appendChild(li);
    });
  }

  beallitKlikkEsemeny( callback ) {
    this.addButton.addEventListener("click", callback);
  }
}
