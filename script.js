function displayStudents(students) {
  const list = document.getElementById("list");

  list.innerHTML = students.map(student => `
    <li>
      ${student.id} | ${student.name} | ${student.course} | ${student.age}
    </li>
  `).join("");
}


async function loadStudents() {
  try {
    const res = await fetch("students.json");
    const data = await res.json();

console.log("FETCH RUNNING");

    console.log(data); // 👈 check yaha
    displayStudents(data);
  } catch (err) {
    console.log(err);
  }
}

loadStudents();

