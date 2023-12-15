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
const questionCounterQuery = document.querySelector("#question-counter p");
const timerClockQuery = document.querySelector(".timer-clock");
const timerBarQuery = document.querySelector(".timer-bar");

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

    questionCounterQuery.style.display = "block";
    questionCounter();
    countdownClock();
    countdownBar();
}


function resetState(){
    NextButtonQuery.style.display = 'none';
    timerBarQuery.style.display = "block";
    timerClockQuery.style.display = "inline";
    while(answerQuery.firstChild){
        answerQuery.firstChild.remove();
        // answerQuery.removeChild(answerQuery.firstChild)
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
        button.style.pointerEvents = 'None';
        button.disabled = true;
    });
    
    stopTimers();

    NextButtonQuery.style.display = 'block';
}

function showScore(){
    resetState();
    questionQuery.innerHTML = `You scored ${score} out of ${questions.length}!`;
    NextButtonQuery.innerHTML = 'Play Again';
    NextButtonQuery.style.display = 'block';
    questionCounterQuery.style.display = "none";
    
    resetTimers();
    timerClockQuery.style.display = "none";
    timerBarQuery.style.display = "none";
}

function handleNextButton(){
    resetTimers();
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

function questionCounter(){
    let questionNumber = currentQuestionIndex +1;
    questionCounterQuery.innerHTML = `${questionNumber}/${questions.length}`;
}

let clockInterval;
function countdownClock(){
    let Time = 15;

    timerClockQuery.textContent = Time;
    Time--;

    clockInterval = setInterval(() =>{
        if(Time >= 0){
        timerClockQuery.textContent = Time;
        Time--;
        }
        else{
            clearInterval(clockInterval);
            noAnswerGiven();
        }
    }, 1000 )
}

let barInterval;
function countdownBar(){
    const totalTime = 1500;
    let remainingTime = totalTime;

    barInterval = setInterval(() =>{
            if(remainingTime >= 0){
                timerBarQuery.style.width = (remainingTime /totalTime) * 100 + "%";
                remainingTime -= 1;
            }
            else{
                clearInterval(barInterval);
                noAnswerGiven();
            }
            if(remainingTime <= 500){
                timerBarQuery.style.background = "red";
            }
    }, 10);
}

function resetTimers(){
    timerBarQuery.style.background = "limegreen";
    clearInterval(clockInterval);
    clearInterval(barInterval);    
}

function stopTimers(){
    clearInterval(barInterval);
    clearInterval(clockInterval);
}

function noAnswerGiven(){
    const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct);

    questionQuery.textContent = "No answer given!"

    Array.from(answerQuery.children).forEach(button => {
        if(button.textContent == correctAnswer.text){
            button.classList.add("correct")
        }
        button.disabled = true;
        button.style.pointerEvents = "none";
    })

    NextButtonQuery.style.display = 'block';
}

startQuiz();
