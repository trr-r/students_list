// 2. Написать программу «Оценки учеников»: есть массив объектов students (id, name, scores — массив чисел),
// нужно написать функции
// addStudent(students, student),
// addScore(students, id, score),
// getAverageScore(students, id)
// и getTopStudents(students, minAverage)
// На странице нужно отображать этот список студентов (для одного студента отображаем имя и список оценок).
// Также на странице будут кнопки для добавления студентов и добавления новой оценки. Эта логика должна работать.
// На странице нужно отображать средний балл (по всем оценкам всех студентов).
// Можно добавить тесты, подумать, какие функции и как здесь можно тестировать

const table = document.querySelector("#table");
const average = document.querySelector("#average");
const addBtn = document.querySelector("#addBtn");
const name = document.querySelector("#name");
const score = document.querySelector("#score");
const selectStudent = document.querySelector("#studentId");
const newScore = document.querySelector("#newScore");
const addScoreBtn = document.querySelector("#addScoreBtn");
const minAverage = document.querySelector("#minAverage");
const topBtn = document.querySelector("#top");
const topStudentsTable = document.querySelector("#topStudentsTable");

let students = [
  {
    id: 1,
    name: "Полина К",
    scores: [4, 3, 2, 5, 4, 4, 5, 3],
  },
  {
    id: 2,
    name: "Степан П",
    scores: [5, 5, 3, 5, 3, 4, 3, 4],
  },
  {
    id: 3,
    name: "Алина Р",
    scores: [4, 5, 4, 5, 4, 3, 5, 5],
  },
  {
    id: 4,
    name: "Петр С",
    scores: [4, 5, 3, 5, 4, 3, 5, 5],
  },
];

// функция получения средней оценки студентов
function getAllAverageScores(students) {
  let allScores = [];
  for (let el of students) {
    allScores.push(...el.scores);
  }
  let sum = allScores.reduce((acc, value) => {
    return acc + value;
  }, 0);
  return (sum / allScores.length).toFixed(2);
}

// функция получения средней оценки студента
function getAverageScore(students, id) {
  for (let el of students) {
    if (el.scores.length === 0) {
      return 0;
    }
    let num = 0;
    if (el.id == id) {
      for (let score of el.scores) {
        num = num + score;
      }
      return (num / el.scores.length).toFixed(2);
    }
  }
}

// функция добавления студента
function addStudent(students, student) {
  students.push(student);
}

// функция добавления оценки
function addScore(students, id, score) {
  for (let el of students) {
    if (el.id == id) {
      el.scores.push(score);
      break;
    }
  }
}

// функция получения списка студентов с средним баллом выше minAverag
function getTopStudents(students, minAverage) {
  let result = [];
  for (let el of students) {
    let avg = Number(getAverageScore(students, el.id));
    if (avg >= minAverage) {
      result.push(el);
    }
  }
  return result;
}

// функция добавления таблицы со списком студентов
const renderList = () => {
  selectStudent.innerHTML = ''
  table.innerHTML = `<tr>
    <th>№</th>
    <th>Имя</th>
    <th>Список оценок</th>
    <th>Средняя оценка</th>
  </tr>`;
  for (let el of students) {
    const html = `
          <tr>
              <td>${el.id}</td>
              <td>${el.name}</td>
              <td>${el.scores.join(" ")}</td>
              <td>${getAverageScore(students, el.id)}</td>
          </tr>
  `;
    table.insertAdjacentHTML("beforeend", html);
    const option = `
    <option value="${el.id}">${el.id}</option>
    `;
    selectStudent.insertAdjacentHTML("beforeend", option);
  }
  average.innerHTML = getAllAverageScores(students);
};
renderList();

// обработчик кнопки "Добавить студента"
addBtn.addEventListener("click", function () {
  let checkOnlyLetters = /^[a-zA-Zа-яА-Я ]+$/;
  if (checkOnlyLetters.test(name.value)) {
    const newItem = {
      id: students.length + 1,
      name: name.value,
      scores: [],
    };
    addStudent(students, newItem);
    renderList();
  } else alert("В имени должны быть только буквы");
});

// обработчик кнопки "Добавить оценку"
addScoreBtn.addEventListener("click", function () {
  if (newScore.value.length > 0 && newScore.value >= 1 && newScore.value <= 5 ) {
    addScore(students, selectStudent.value, Number(newScore.value));
    renderList();
  }
  else{
    alert("Оценка от 1 до 5")
  }
});

// функция для отображения лучших студентов в таблице
function renderTopStudents(students) {
  topStudentsTable.innerHTML = `
    <tr>
      <th>№</th>
      <th>Имя</th>
      <th>Средняя оценка</th>
    </tr>
  `;
  for (let el of students) {
    const html = `
      <tr>
        <td>${el.id}</td>
        <td>${el.name}</td>
        <td>${getAverageScore(students, el.id)}</td>
      </tr>
    `;
    topStudentsTable.insertAdjacentHTML("beforeend", html);
  }
}

//обработчик кнопки Добавить среднюю оценку
topBtn.addEventListener("click", function () {
  const minAvg = Number(minAverage.value);
  const topStudents = getTopStudents(students, minAvg);
  renderTopStudents(topStudents);
});
