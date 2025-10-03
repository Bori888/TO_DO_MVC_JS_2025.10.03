export default class ToDoView {
  constructor() {
    this.inputElem = document.getElementById("todo-input");
    this.addButton = document.getElementById("add-button");
    this.jegyzetListElem = document.getElementById("todo-list");
    this.tipusContainer = document.getElementById("tipus-container");
  }

  beallitJegyzetHozzaadas(callback) {
    this.addButton.addEventListener("click", callback);
  }

  getInputErtek() {
    return this.inputElem.value.trim();
  }

  inputTorles() {
    this.inputElem.value = "";
  }

  getKivalasztottTipusok() {
    const checkboxes = this.tipusContainer.querySelectorAll("input[type=checkbox]");
    return Array.from(checkboxes)
      .filter(ch => ch.checked)
      .map(ch => ch.value);
  }

  // Segédfüggvény: visszaadja a kijelölt típusok ID-it (Controller hívja)
  getKivalasztottTipusokCheckbox() {
    const checkboxes = this.tipusContainer.querySelectorAll("input[type=checkbox]");
    return Array.from(checkboxes)
      .filter(ch => ch.checked)
      .map(ch => ch.value);
  }

  megjelenitTipusokat(tipusok) {
    this.tipusContainer.innerHTML = "";

    tipusok.forEach(t => {
      const label = document.createElement("label");
      label.classList.add("tipus-label");
      label.style.color = t.szin;

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = t.id;
      label.appendChild(cb);

      label.appendChild(document.createTextNode(` ${t.nev} `));

      this.tipusContainer.appendChild(label);
    });

    // Új típus gomb
    const btnUj = document.createElement("button");
    btnUj.textContent = "+ Új típus";
    btnUj.classList.add("btn-uj-tipus");
    btnUj.addEventListener("click", () => this.hivasUjTipus());
    this.tipusContainer.appendChild(btnUj);

    // Kijelölt típusok törlése gomb
    const btnTorol = document.createElement("button");
    btnTorol.textContent = "Típus törlés";
    btnTorol.classList.add("btn-tipus-torol");
    btnTorol.addEventListener("click", () => this.hivasKivalasztottTipusTorles());
    this.tipusContainer.appendChild(btnTorol);
  }

  beallitKivalasztottTipusTorles(callback) {
    this.hivasKivalasztottTipusTorles = callback;
  }

  megjelenitJegyzeteket(jegyzetek, tipusok) {
    this.jegyzetListElem.innerHTML = "";

    jegyzetek.forEach(j => {
      const li = document.createElement("li");
      li.classList.add("jegyzet-listaelem");

      const szovegDiv = document.createElement("div");
      szovegDiv.classList.add("jegyzet-szoveg");

      const p = document.createElement("p");
      p.textContent = j.szoveg;
      p.classList.add("jegyzet-p");
      szovegDiv.appendChild(p);

      // Típus címkék
      const tipusSpanContainer = document.createElement("div");
      tipusSpanContainer.classList.add("tipus-span-container");

      j.tipusok.forEach(tid => {
        const t = tipusok.find(tt => tt.id === tid);
        if (t) {
          const span = document.createElement("span");
          span.textContent = t.nev;
          span.classList.add("tipus-cimke");
          span.style.color = t.szin;
          span.style.borderColor = t.szin;
          tipusSpanContainer.appendChild(span);
        } else {
          console.warn(`Nem található típus id: ${tid}`);
        }
      });

      szovegDiv.appendChild(tipusSpanContainer);
      li.appendChild(szovegDiv);

      // Jegyzet törlés gomb
      const btnTorol = document.createElement("button");
      btnTorol.textContent = "Törlés";
      btnTorol.title = "Jegyzet törlése";
      btnTorol.classList.add("btn-jegyzet-torol");
      btnTorol.addEventListener("click", () => {
        this.hivasJegyzetTorles(j.id);
      });

      li.appendChild(btnTorol);
      this.jegyzetListElem.appendChild(li);
    });
  }

  beallitJegyzetTorles(callback) {
    this.hivasJegyzetTorles = callback;
  }

  beallitUjTipus(callback) {
    this.hivasUjTipus = callback;
  }
}
