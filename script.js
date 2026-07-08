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

  const averageAge = students.reduce((sum, student) => {
    return sum + student.age;
  }, 0) / total;


  const courseCount = students.reduce((acc, student) => {

    acc[student.course] = (acc[student.course] || 0) + 1;

    return acc;

  }, {});


  document.getElementById("stats").innerHTML = `
    <h3>Total Students: ${total}</h3>
    <h3>Average Age: ${averageAge.toFixed(2)}</h3>
    <h3>Course Count:</h3>
    <p>${JSON.stringify(courseCount)}</p>
  `;
}


loadStudents();