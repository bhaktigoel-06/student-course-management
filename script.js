function displayStudents(students) {
  const list = document.getElementById("list");

  list.innerHTML = students.map(student => `
    <li>
      ${student.id} | ${student.name} | ${student.course} | ${student.age}
    </li>
  `).join("");
}

let allStudents = [];

async function loadStudents() {
  try {
    const res = await fetch("students.json");
    const data = await res.json();

console.log("FETCH RUNNING");

    console.log(data); 
    allStudents = data;
    displayStudents(data);
  } catch (err) {
    console.log(err);
  }
}

// search logic
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allStudents.filter(student => student.name.toLowerCase().includes(value));
  displayStudents(filtered);
});
loadStudents();