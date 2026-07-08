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


// course filter logic
const courseFilter = document.getElementById("courseFilter");

courseFilter.addEventListener("change", () => {
  const selectedCourse = courseFilter.value;

  if (selectedCourse === "all") {
    displayStudents(allStudents);
  } else {
    const filtered = allStudents.filter(student => student.course === selectedCourse);
    displayStudents(filtered);
  }
});
loadStudents();