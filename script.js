//Timer
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("time");
var secondsLeft = 100;
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left to finish quiz.";
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}
function sendMessage() {
  timeEl.textContent = " ";
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", ".\image\Gameover.webp");// somehow the image not coming out
  mainEl.appendChild(imgEl);
}
setTime();

// list of questions
let questions = [
    {
    numb: 1,
    question: "what is HTML",
    answer: "A front end coding language",
    options: [
      "food",
      "bank",
      "factory",
      "A front end coding language"
    ]
  },
    {
    numb: 2,
    question: "What is CSS?",
    answer: "a style language for coding",
    options: [
      "police department",
      "a school",
      "a style language for coding",
      "my house"
    ]
  },
    {
    numb: 3,
    question: "What is Javascript?",
    answer: "a coding language for both front and back end",
    options: [
      "a coding language for both front and back end",
      "a person's name",
      "UFO",
      "a car"
    ]
  },
    {
    numb: 4,
    question: "how hot is the weather in Texas?",
    answer: "hot like my butt",
    options: [
      "hot like my butt",
      "really chill",
      "cold like my ex-girlfriend",
      "cold like my ice cream"
    ]
  },
    {
    numb: 5,
    question: "Is coding hard?",
    answer: "hard as hell",
    options: [
      "no",
      "easy",
      "hard as hell",
      "what a cake"
    ]
  },
];

// use .querySelector to grab classes into variable 
const startBt = document.querySelector(".start button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

//set up start bottun
startBt.onclick = ()=>{ 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".Submit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    next_btn.classList.remove("show"); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        // try to add time deduction function 
        document.getElementById('time').addEventListener('click', function() {
        sec -= 5;
        });
        // have not figured out yet

        answer.classList.add("incorrect"); 
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ 
        let scoreTag = '<span><p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>is correct</span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1){ 
        let scoreTag = '<span><p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>is correct</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span><p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>is correct</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}