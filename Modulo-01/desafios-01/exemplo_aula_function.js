const students = [
  {
    name: "Caio",
    grade: 0,
  },
  {
    name: "Fulano",
    grade: 10,
  },
];

function calculateAverage(students) {
  let sum = 0;

  for (var i = 0; i < students.length; i++) {
    sum = sum + students[i].grade;
  }

  const average = sum / students.length;

  return average;
}

function sendMessage(average) {
  if (average >= 5) {
    console.log("Parabéns, turma aprovada!");
  } else {
    console.log("Turma em recuperação!");
  }
}

function markAsFlunked(student) {
  student.flunked = false;

  if (student.grade < 5) {
    student.flunked = true;
  }
}

function sendMessageflunked(student) {
  if (student.flunked) {
    console.log(`O student ${student.name} está flunked!`);
  }
}

function studentsflunkeds(students) {
  for (let student of students) {
    markAsFlunked(student);
    sendMessageflunked(student);
  }
}

const average = calculateAverage(students);

sendMessage(average);

studentsflunkeds(students);
