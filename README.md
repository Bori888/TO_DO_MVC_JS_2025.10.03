# ToDo Lista

## Leírás

Ez egy egyszerű, fekete-fehér, letisztult megjelenésű ToDo lista alkalmazás, amely az **MVC (Model-View-Controller)** tervezési minta alapján készült JavaScript nyelven.

A felhasználó beírhat egy tételt a szövegmezőbe, majd a "Listába" gomb megnyomásával a tétel bekerül a listába, amelyet az oldal alján megjelenítünk.

---

## Projekt felépítése

/
├── controller/
│ └── ToDoController.js # A vezérlő réteg, kezeli az eseményeket, összeköti a modellt és a nézetet
├── modell/
│ └── ToDoModell.js # Az adatmodell, tárolja a listát
├── view/
│ └── ToDoView.js # A nézet réteg, kezeli a DOM elemeket, megjelenítést
├── index.html # Az alkalmazás fő HTML oldala
├── main.js # A modulokat összekapcsoló fő JavaScript fájl
├── stilus.css # Egyszerű, fekete-fehér, letisztult stíluslap
└── README.md # Ez a dokumentáció
