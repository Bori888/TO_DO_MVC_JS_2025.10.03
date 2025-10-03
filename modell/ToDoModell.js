export default class ToDoModell {
  constructor() {
    this.jegyzeteim = [];
    this.tipusok = [
      { id: "fontos", nev: "Fontos", szin: "#ff0000" }
    ];
    this._betoltesLocalStorage();
  }

  _betoltesLocalStorage() {
    const j = localStorage.getItem("jegyzeteim");
    const t = localStorage.getItem("tipusok");

    if (j) this.jegyzeteim = JSON.parse(j);
    if (t) {
      const betoltottTipusok = JSON.parse(t);
      if (betoltottTipusok.length === 0) {
        this.tipusok = [{ id: "fontos", nev: "Fontos", szin: "#ff0000" }];
      } else {
        this.tipusok = betoltottTipusok;
      }
    }
  }

  _mentesLocalStorage() {
    localStorage.setItem("jegyzeteim", JSON.stringify(this.jegyzeteim));
    localStorage.setItem("tipusok", JSON.stringify(this.tipusok));
  }

  // Típusok kezelése
  osszesTipus() {
    return this.tipusok;
  }

  tipusHozzaad(nev, szin) {
    const uj = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      nev,
      szin
    };
    this.tipusok.push(uj);
    this._mentesLocalStorage();
    return uj;
  }

  tipusTorol(tipusId) {
    if (tipusId === "fontos") {
      alert("A 'Fontos' típust nem lehet törölni!");
      return;
    }
    this.tipusok = this.tipusok.filter(t => t.id !== tipusId);
    this.jegyzeteim.forEach(j => {
      j.tipusok = j.tipusok.filter(tid => tid !== tipusId);
    });
    this._mentesLocalStorage();
  }

  tipusModosit(tipusId, ujNev, ujSzin) {
    const t = this.tipusok.find(t => t.id === tipusId);
    if (t) {
      t.nev = ujNev;
      t.szin = ujSzin;
      this._mentesLocalStorage();
    }
  }

  // Jegyzetek kezelése
  osszesJegyzet() {
    return this.jegyzeteim;
  }

  jegyzetHozzaad(szoveg, tipusIds = []) {
    const uj = {
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      szoveg,
      tipusok: tipusIds
    };
    this.jegyzeteim.push(uj);
    this._mentesLocalStorage();
    return uj;
  }

  jegyzetTorol(jegyzetId) {
    this.jegyzeteim = this.jegyzeteim.filter(j => j.id !== jegyzetId);
    this._mentesLocalStorage();
  }

  jegyzetModosit(jegyzetId, ujSzoveg, ujTipusIds) {
    const j = this.jegyzeteim.find(j => j.id === jegyzetId);
    if (j) {
      j.szoveg = ujSzoveg;
      j.tipusok = ujTipusIds;
      this._mentesLocalStorage();
    }
  }
}
