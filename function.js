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
      scores: [4, 5, 3, 5, 4, 3, 5, 5]
    }
  ];
  
  // функция получения средней оценки студента
  function getAverageScore(students, id){
    for(let el of students){
        let num = 0
        if(el.id == id){
            for(let score of el.scores){
                num = num + score
            }
            return num/el.scores.length
        }
    }}
console.log(getAverageScore(students, 4))
