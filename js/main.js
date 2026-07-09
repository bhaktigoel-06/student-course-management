// Add student logic
function addStudent() {
  let name = document.getElementById("name").value;
  let course = document.getElementById("course").value;

  let newStudent = {
    id: Date.now(),
    name,
    course
  };

  students.push(newStudent);
  saveToLocalStorage(students);  
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

// delete logic
  function deleteStudent(id) {
    allStudents = allStudents.filter(s => s.id !== id);
    showStats(allStudents);
    saveToLocalStorage(students);  
    displayStudents(allStudents);

    document.getElementById("details").innerHTML = "";
  }

  //edit logic
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

  document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
});

document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};