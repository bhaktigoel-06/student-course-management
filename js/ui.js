//display students in the list
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



// show details logic
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

//close details logic
    function closeDetails() {
  document.getElementById("details").style.display = "none";
}

// stats logic
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
