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
    newAns.onclick = checkIfRight(arrDiff, que)

    que.incorrect_answers.forEach(
        x => {
            const newWro = document.createElement('li')
            newWro.innerText = x
            newUl.appendChild(newWro)
            newWro.onclick = checkIfRight(arrDiff, que)
        }
    )
}


window.onload = function () {
    welcomePage()
    //IF YOU ARE DISPLAYING ALL THE QUESTIONS TOGETHER:
    //HINT: for each question, create a container with the "question"
    //create a radio button https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio with, as option the both the correct answer and the incorrect answers
    //when EVERY question has an answer (google for how to get a value from a radio button with JS)
    //IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
    //Display first question with a title + radio button
    //when the user select the answer, pick the next question and remove this from the page after added in a varible the users' choice.
};

//HOW TO calculate the result
//You can do it in 2 ways:
//If you are presenting all questions together, just take all the radio buttons and check if the selected answer === correct_answer
//If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer