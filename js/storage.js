import { displayStudents } from './ui.js';

// Local storage logic
function saveToLocalStorage(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

// Load from local storage
function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

let students = getFromLocalStorage();
displayStudents(students);