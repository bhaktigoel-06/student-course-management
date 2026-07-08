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
    showStats(data);
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

function showStats(students) {

  const total = students.length;

  const averageAge = students.reduce((sum, s) => sum + s.age, 0) / total;

  const courseCount = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  const courseHTML = Object.entries(courseCount)
    .map(([course, count]) => `<p>${course}: ${count}</p>`)
    .join("");

  document.getElementById("stats").innerHTML = `
    <div class="stats-container">
      
      <div class="card">
        <h3>Total Students</h3>
        <p>${total}</p>
      </div>

      <div class="card">
        <h3>Average Age</h3>
        <p>${averageAge.toFixed(1)}</p>
      </div>

      <div class="card">
        <h3>Courses</h3>
        ${courseHTML}
      </div>

    </div>
  `;
}

  

loadStudents();