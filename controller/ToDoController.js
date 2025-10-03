import ToDoModell from '../modell/ToDoModell.js';
import ToDoView from '../view/ToDoView.js';

export default class ToDoController {
  constructor() {
    this.model = new ToDoModell();
    this.view = new ToDoView();

    this.view.beallitJegyzetHozzaadas(() => this.jegyzetHozzaad());
    this.view.beallitJegyzetTorles((id) => this.jegyzetTorles(id));
    this.view.beallitUjTipus(() => this.tipusHozzaad());
    this.view.beallitKivalasztottTipusTorles(() => this.kivalasztottTipusTorles());

    this.frissit();
  }

  frissit() {
    this.view.megjelenitTipusokat(this.model.osszesTipus());
    this.view.megjelenitJegyzeteket(this.model.osszesJegyzet(), this.model.osszesTipus());
  }

  jegyzetHozzaad() {
    const szoveg = this.view.getInputErtek();
    if (!szoveg) return;

    const kivalasztottTipusok = this.view.getKivalasztottTipusok();
    this.model.jegyzetHozzaad(szoveg, kivalasztottTipusok);
    this.view.inputTorles();
    this.frissit();
  }

  jegyzetTorles(id) {
    if (confirm("Biztosan törölni szeretnéd ezt a jegyzetet?")) {
      this.model.jegyzetTorol(id);
      this.frissit();
    }
  }

  tipusHozzaad() {
    const nev = prompt("Add meg az új típus nevét:");
    if (!nev) return;

    const szin = prompt("Add meg a típus színét (pl. #00ff00):", "#0000ff") || "#0000ff";
    this.model.tipusHozzaad(nev, szin);
    this.frissit();
  }

  kivalasztottTipusTorles() {
    const kijelolt = this.view.getKivalasztottTipusokCheckbox();

    if (kijelolt.includes("fontos")) {
      alert("A 'Fontos' típust nem lehet törölni!");
      return;
    }

    if (kijelolt.length === 0) {
      alert("Nincs kijelölt típus a törléshez!");
      return;
    }

    if (confirm("Biztosan törlöd a kijelölt típust/típusokat?")) {
      kijelolt.forEach(tid => this.model.tipusTorol(tid));
      this.frissit();
    }
  }
}
