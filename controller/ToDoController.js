export default class ToDoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.beallitKlikkEsemeny(this.listabaHozzaadas.bind(this));
  }

  listabaHozzaadas() {
    const szoveg = this.view.getInputErtek();
    if (szoveg !== "") {
      this.model.hozzaad(szoveg);
      this.view.inputTorles();
      this.view.megjelenitListat(this.model.osszesElem());
    }
  }
}
