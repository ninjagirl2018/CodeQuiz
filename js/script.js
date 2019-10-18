var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title :"Which internet company began life as an online bookstore called Cadabra?",
      choices: ["Amazon","eBay","Overstock","Shopify"],
      answer :"Amazon"
    },
    {
      title:"When was the programming language C# released?",
      choices:["1998","1999","2001","2000"],
      answer:"2000",
    },
    {
        title:"When was the programming language C# released?",
        choices:["1998","1999","2001","2000"],
        answer:"2000",
      },
      {
        title:"When was the programming language C# released?",
        choices:["1998","1999","2001","2000"],
        answer:"2000",
      },
      {
        title:"When was the programming language C# released?",
        choices:["1998","1999","2001","2000"],
        answer:"2000",
      },
  ]
  

var questions = [questions];
let tl = new TimelineMax()


// Start by listng out all the variables required
var viewHighScores = document.querySelector("#viewHighScores");
var timer = document.getElementById("timer");
var startButton = document.getElementById("startButton");
var confirmPlay = document.querySelector(".confirmPlay");
var preQuizWindow = document.querySelector(".preQuizWindow");
var quizQuestions = document.querySelector(".quizQuestions");
var quizQuestionsTitle = document.querySelector("#quizQuestionsTitle");
var rightAnswer = document.querySelector(".rightAnswer");
var wrongAnswer = document.querySelector(".wrongAnswer");
var but1 = document.querySelector("#but1");
var but2 = document.querySelector("#but2");
var but3 = document.querySelector("#but3");
var but4 = document.querySelector("#but4");
var playerName = document.querySelector("#playerName");
var submit = document.querySelector("#submit");
var quizResults = document.querySelector(".quizResults");
var finalScore = document.querySelector("#finalScore");
var highScores = document.querySelector(".highScores");
var clearHighScores = document.querySelector("#clearHighScores");
var restartButton = document.querySelector("#restartButton");
var scoreBoard = document.querySelector("#scores");

let confirmPlayData=[]
//let dataLength=[];
//let q;
//let answer;
let score;
//let time;
//let seconds;
let intervalId;
let scoreList=[];

//const line = document.querySelector('.line')

//const allButtons = document.querySelectorAll('.button')



// 1. There are 3 Listeners:  Start Quiz, Confirm, and View Highscores that are not inside functions
preQuizWindow.classList.remove("hide")
startButton.addEventListener("click",confirmStart)
viewHighScores.addEventListener("click",viewAllScores)

//FUNCTIONS START HERE, LOOSELY IN ORDER OF EXECUTION TO RUN THROUGH THE ENTIRE GAME

//This function runs when user clicks on the "View All High Scores" button, if there's locally stored
//data it will display, with the option to restart the quiz or clear the scores
function viewAllScores(){
    quizQuestions.classList.add('hide');
    rightAnswer.classList.add('hide');
    wrongAnswer.classList.add('hide');
    quizResults.classList.add('hide');
    preQuizWindow.classList.add('hide');
    highScores.classList.remove('hide')
    displayScores()
    clearHighScores.addEventListener('click', clearScore )
    restartButton.addEventListener('click',startOver)
}

//Reset function sets the timer back to 0 and also runs inside the startGame function
function reset(){
    dataLength=[];
    clearInterval(intervalId);
}

//Triggered by the Start Quiz button and hides the first div and displays the confirm page
function readySetGo(e){
    reset()
    confirmPlay.classList.add("hide")
    loadData(e.path[0].textContent)
    score=0;
    startTimer()
    quizActual()
}

//Confirms with the user readiness to start the game, then runs ReadySetGo function
function confirmStart(){
    preQuizWindow.classList.add("hide");
    confirmPlay.classList.remove("hide");
    document.querySelectorAll(".confirmPlay button")[0].addEventListener("click",readySetGo);
};

//hides the confirm ready div and opens up the quizQuestions window

function loadData(x){
        confirmPlayData=questions[0]
        for ( let i in questions[0]){
            dataLength.push(Number([i].join()))
        }
}

//This records the results of each game to local storage so it can later be displayed in aggregate until it's cleared by the user
function recordScore(x){
    let str;
    if (localStorage.getItem("keepScore") === null){
        if (typeof x === typeof undefined ){
        } else{
            scoreList.push( {name : `${x}`, score : `${score}` })
            str = JSON.stringify(scoreList)
            localStorage.setItem("keepScore", str); 
        }
    } else{
        str = localStorage.getItem("keepScore"); 
        str = JSON.parse(str);
        str.push( {name : `${x}`, score : `${score}` })
        scoreList = str;
        str = JSON.stringify(str);
        localStorage.setItem("keepScore",str)
    }
}

//When user wants to clear out the high scores ...
function clearScore(){
    scoreBoard.innerHTML = "Recent Scores Cleared";
    scoreList=[];
    localStorage.clear()
}

//When a user wants to restart
function startOver(){
    highScores.classList.add("hide");
    quizQuestions.classList.add("hide");
    rightAnswer.classList.add("hide");
    wrongAnswer.classList.add("hide");
    quizResults.classList.add("hide");
    preQuizWindow.classList.remove("hide");
}

//8.  This function manages the scorelist, and if there is no score stored in local storage, it alerts
function displayScores(){
    let scoreKeeper="";
    let x;
    if (localStorage.getItem("keepScore") === null){
        scoreBoard.innerHTML = "Currently no scores are stored"

    //if there is a score in local storage, retrieve it and and make it into a JS object and make it 
    //into an array called x or scoreList which takes in 2 parameters, the input of the player's name and 
    //their
    }else{
        scoreList=localStorage.getItem("keepScore");
        scoreList = JSON.parse(scoreList);
        x = scoreList.sort(function(b,a){
            return a.score - b.score
        })
        scoreList=[];
        for (let i in x ){
            scoreList.push(`<p>${x[i].name} - Score: ${x[i].score}%</p>`)
        }
        for (let i in scoreList){
            scoreKeeper = scoreKeeper + scoreList[i]
        }
        scoreBoard.innerHTML = scoreKeeper;
    }
}

//If the player inputs a name, then we put record their name and score and display it by running
//the viewAll Scores function
function saveScore(){
    if (playerName.value !== ""){
        quizResults.classList.add("hide");
        highScores.classList.remove("hide")
        recordScore(playerName.value)
        viewAllScores();
    }
}

//When game is over, timer is cleared, las question disappears
function gameEnd(){
    clearInterval(intervalId)
    quizQuestions.classList.add("hide");
    quizResults.classList.remove("hide");

    //turns the score into a % so that even when we change the number of questions, the program will work
    score = Math.floor(((score/confirmPlayData.length)*100));
    finalScore.textContent = score;
    submit.addEventListener("click",saveScore);
}

//the Evaluate function 
function evaluate(e){
    if (e.path[0].textContent === answer){
        setTimeout(()=>{
            rightAnswer.classList.remove('hide');
            line.classList.remove('hide')
            setTimeout(()=>{
                rightAnswer.classList.add('hide');
                line.classList.add('hide')
            },1000)
        },0)
        wrongAnswer.classList.add('hide');
        score++;
        if (dataLength.length ===0 ){
            gameEnd()
        } else {
            quizActual()
        }
    } else {
        setTimeout(()=>{
            wrongAnswer.classList.remove('hide');
            line.classList.remove('hide')
            setTimeout(()=>{
                wrongAnswer.classList.add('hide');
                line.classList.add('hide')
            },1000)
        },0)

    //penalize the player by reducing 10 seconds off the clock if the answer is wrong
        if (seconds === 0){
            setTimeout(()=>{
                seconds = seconds - 10
                tl.to(timer,0.5,{color:'red',})
                .to(timer,0.2,{color:'black',});
            },1001)
        }else{
            tl.to(timer,0.5,{color:'red',})
            .to(timer,0.2,{color:'black',});
            seconds = seconds - 10
        }
        rightAnswer.classList.add('hide');
        if (dataLength.length ===0 ){
            gameEnd()
        } else {
            quizActual()
        }
    }
}

function quizActual(){
    quizQuestions.classList.remove('hide')
    wrongAnswer.classList.add('hide');
    rightAnswer.classList.add('hide');
    q = dataLength.shift()
    answer = confirmPlayData[q].answer
    quizQuestionsTitle.textContent = confirmPlayData[q].title;
    but1.textContent = confirmPlayData[q].choices[0]
    but2.textContent = confirmPlayData[q].choices[1]
    but3.textContent = confirmPlayData[q].choices[2]
    but4.textContent = confirmPlayData[q].choices[3]
    but1.addEventListener('click',evaluate)
    but2.addEventListener('click',evaluate)
    but3.addEventListener('click',evaluate)
    but4.addEventListener('click',evaluate)

    quizQuestions.classList.remove('hide');
}

function startTimer(){
    seconds = 0;
    let minutes = 1;
    time = minutes+':'+seconds;
    timer.textContent = time
    intervalId = setInterval(()=>{
        if (seconds == 0){
            seconds = 60;
            minutes--;
        }
        seconds --;
        time = minutes+':'+seconds;
        timer.textContent = time
        if (time === '0:0' ){
            clearInterval(intervalId);
            clearInterval(setInterval);
            gameEnd();
        }
    },1000);
}


//function color (){
  //  timer.style.color = 'red';
//}

