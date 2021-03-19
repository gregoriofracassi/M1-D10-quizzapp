const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "difficult",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "medium",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "medium",
        question:
          "Who is Bart's father",
        correct_answer: "Homer",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "difficult",
        question:
          "Who wears Barcelona's n. 10 jersey",
        correct_answer: "Messi",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

let questionNum = 0
let score = 0
easyQuestions = []
mediumQuestions = []
difficultQuestions = []

const divideByDifficulty = (arr) => {
    arr.forEach(
        x => {
            if(x.difficulty === "easy") {
                easyQuestions.push(x)
            } else if (x.difficulty === "medium") {
                mediumQuestions.push(x)
            } else {
                difficultQuestions.push(x)
            }
        }
    )
}
divideByDifficulty(questions)

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const clearPage = () => document.querySelector('#centered').innerHTML = "" 

const appendNewToCentered = (elemTag, text) => {
    const elem = document.createElement(elemTag)
    elem.innerText = text
    document.querySelector('#centered').appendChild(elem)
}

const welcomePage = () => {
    questionNum = 0
    clearPage() 
    appendNewToCentered('h1', 'Welcome to Quizzap!')
    appendNewToCentered('h3', 'Choose your difficulty:')

    const easyButt = document.createElement('input')
    easyButt.value = "easy"
    easyButt.type = "button"
    document.querySelector('#centered').appendChild(easyButt)
    easyButt.onclick = () => displayQuest(easyQuestions, easyQuestions[questionNum])

    const mediumButt = document.createElement('input')
    mediumButt.value = "medium"
    mediumButt.type = "button"
    document.querySelector('#centered').appendChild(mediumButt)
    mediumButt.onclick = () => displayQuest(mediumQuestions, mediumQuestions[questionNum])

    const difficultButt = document.createElement('input')
    difficultButt.value = "difficult"
    difficultButt.type = "button"
    document.querySelector('#centered').appendChild(difficultButt)
    difficultButt.onclick = () => displayQuest(difficultQuestions, difficultQuestions[questionNum])

}

const displayFinalResult = (arrDiff) => {
    clearPage() 
    appendNewToCentered('h1', `Your result is ${score}/${arrDiff.length}`)
   
    const buttonBack = document.createElement('input')
    buttonBack.value = "Try again"
    buttonBack.type = 'button'
    document.querySelector('#centered').appendChild(buttonBack)
    buttonBack.onclick = welcomePage
    score = 0
}

const checkIfRight = (arrDiff, que) => {
    return (e) => {
        let result = ""
        que.incorrect_answers.includes(e.target.innerText) ? result = "wrong" : result = "right"
        clearPage()
        if(result === "right") {
            appendNewToCentered('h1', 'Right answer!')
            score++
        } else {
            appendNewToCentered('h1', 'Nope, wrong answer')
        }
        const buttonNext = document.createElement('input')
        buttonNext.type = 'button'
        questionNum === arrDiff.length - 1 ? buttonNext.value = "See your results" : buttonNext.value = "Next questions"
        document.querySelector('#centered').appendChild(buttonNext) 
        buttonNext.onclick = () => {
            questionNum++
            if(questionNum < arrDiff.length) {
                displayQuest(arrDiff, arrDiff[questionNum])
            } else {
                displayFinalResult(arrDiff)
            }
        }
    }
}

const displayQuest = (arrDiff, que) => {
    clearPage()   
    appendNewToCentered('h2', que.question)

    const newUl = document.createElement('ul')
    document.querySelector('#centered').appendChild(newUl)

    const newAns = document.createElement('li')
    newAns.innerText = que.correct_answer
    newUl.appendChild(newAns)
    newAns.classList.add('listItem')
    newAns.onclick = checkIfRight(arrDiff, que)

    que.incorrect_answers.forEach(
        x => {
            const newWro = document.createElement('li')
            newWro.innerText = x
            newUl.appendChild(newWro)
            newWro.classList.add('listItem')
            newWro.onclick = checkIfRight(arrDiff, que)
        }
    )

    for (let i = newUl.children.length; i >= 0; i--) {
        newUl.appendChild(newUl.children[Math.random() * i | 0])
    }
}

window.onload = function () {
    welcomePage()
};