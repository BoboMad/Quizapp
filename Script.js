const questions = [
    {
        question: 'What country has the highest life expectancy?',
        answers: [
            {text:'Sweden', correct: false},
            {text:'Japan', correct: true},
            {text:'Norway', correct: false},
            {text:'USA', correct: false},
        ]
    },
    {
        question: 'What is the most common surname in USA?',
        answers: [
            {text:'Ivansson', correct: false},
            {text:'Jordan', correct: false},
            {text:'Carlsson', correct: false},
            {text:'Smith', correct: true},
        ]
    },
    {
        question: 'How many minutes are in a full week?',
        answers: [
            {text:'10,080 minutes', correct: true},
            {text:'5045 minutes', correct: false},
            {text:'2544 minutes', correct: false},
            {text:'12,544 minutes', correct: false},
        ]
    },
    {
        question: 'What artist has the most streams on spotify?',
        answers: [
            {text:'Avicii', correct: false},
            {text:'Drake', correct: true},
            {text:'Eminem', correct: false},
            {text:'Taylor Swift', correct: false},
        ]
    }
];

const questionQuery = document.querySelector('#question');
const answerQuery = document.querySelector('.Answer-buttons');
const NextButtonQuery = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    NextButtonQuery.innerHTML = 'Next';
    ShowQuestion();
}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionQuery.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerQuery.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', SelectAnswer);
        
    })
}


function resetState(){
    NextButtonQuery.style.display = 'none';
    while(answerQuery.firstChild){
        answerQuery.removeChild(answerQuery.firstChild)
    }
}

function SelectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == 'true';
    if (isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerQuery.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    NextButtonQuery.style.display = 'block';
}

function showScore(){
    resetState();
    questionQuery.innerHTML = `You scored ${score} out of ${questions.length}!`;
    NextButtonQuery.innerHTML = 'Play Again';
    NextButtonQuery.style.display = 'block';
    nex
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        showScore();
    }
}


NextButtonQuery.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
