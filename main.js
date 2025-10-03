import ToDoModell from './modell/ToDoModell.js';
import ToDoView from './view/ToDoView.js';
import ToDoController from './controller/ToDoController.js';

document.addEventListener("DOMContentLoaded", () => {
    const modell = new ToDoModell();
    const view = new ToDoView();
    const controller = new ToDoController(modell, view);
});
