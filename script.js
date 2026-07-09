function displayStudents(students) {
  const list = document.getElementById("studentList");

  list.innerHTML = students.map(student => `
    <div class="card" onclick="showDetails(${student.id})">
      <h3>${student.name}</h3>
      <button onclick="editStudent(${student.id})">Edit</button>
      <button onclick="deleteStudent(${student.id})">Delete</button>
    </div>
  `).join("");
}

function addStudent() {
  let name = document.getElementById("name").value;
  let course = document.getElementById("course").value;

  let newStudent = {
    id: Date.now(),
    name,
    course
  };

  students.push(newStudent);
  saveToLocalStorage(students);   // ⭐ important
  displayStudents(students);
}



const form = document.getElementById("studentForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const studentData = {
    id: editId || Date.now(),
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    email: document.getElementById("email").value,
    course: document.getElementById("course").value,
    enrollmentYear: Number(document.getElementById("year").value),
    gpa: Number(document.getElementById("gpa").value)
  };

  if (editId) {
    // update existing
    allStudents = allStudents.map(s =>
      s.id === editId ? studentData : s
    );
    editId = null;
  } else {
    // add new
    allStudents.push(studentData);
  }

   localStorage.setItem("students", JSON.stringify(allStudents));

  showStats(allStudents);
  displayStudents(allStudents);

  form.reset();
});

function saveToLocalStorage(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

let students = getFromLocalStorage();
displayStudents(students);


function showStats(students) {
  const total = students.length;

  const avgAge =
    students.reduce((sum, s) => sum + s.age, 0) / total;

  const courseCount = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  const container = document.getElementById("stats");

  container.innerHTML = `
    <p>Total Students: ${total}</p>
    <p>Average Age: ${avgAge.toFixed(1)}</p>
    <p>Courses:</p>
    <ul>
      ${Object.entries(courseCount)
        .map(([course, count]) => `<li>${course}: ${count}</li>`)
        .join("")}
    </ul>
  `;
}

let allStudents = [];

async function loadStudents() {
  try {
    const res = await fetch("students.json");
    const data = await res.json();

console.log("FETCH RUNNING");

    console.log(data); 
    allStudents = data;
    showStats(data);
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
function showDetails(id) {
  const student = allStudents.find(s => s.id === id);
  if (!student) return;

  const details = document.getElementById("details");

  details.style.display = "block";

  details.innerHTML = `
    <h2>${student.name}</h2>
    <p><strong>ID:</strong> ${student.id}</p>
    <p><strong>Age:</strong> ${student.age}</p>
    <p><strong>Email:</strong> ${student.email}</p>
    <p><strong>Course:</strong> ${student.course}</p>
    <p><strong>Year:</strong> ${student.enrollmentYear}</p>
    <p><strong>GPA:</strong> ${student.gpa}</p>
    <button onclick="closeDetails()">Close</button>
  `;
}

  function deleteStudent(id) {
    allStudents = allStudents.filter(s => s.id !== id);
    showStats(allStudents);
    saveToLocalStorage(students);  
    displayStudents(allStudents);

    document.getElementById("details").innerHTML = "";
  }

  let editId=null;
  function editStudent(id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;

    editId=id;

    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("year").value = student.enrollmentYear;
    document.getElementById("gpa").value = student.gpa;

    window.scrollTo({ top: 0, behavior: "smooth" });

  }

    function closeDetails() {
  document.getElementById("details").style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
});