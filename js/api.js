// fetch logic
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
