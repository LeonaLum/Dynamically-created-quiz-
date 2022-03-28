
const containerPopup = document.getElementById("container_popup");
const popUp = document.getElementById("popup");
let buttonReplay = document.getElementById("button-replay");

let buttonContainer = document.getElementById("button_container");
let buttonStart = document.getElementById("button-start");
let welcomeWindow = document.getElementById("gradient");
let buttonAnswer = document.getElementById("button-next");
let buttonScore = document.getElementById("button-score");
let points = 0;
let maxPoints = 100;
let round = 0;
let radioButtons = [];
let checkBoxes = [];
let correctCheckboxes = [];
let yourAnswers = [];
let uncheckedQuestions = [];

let scoreContainer = document.createElement("div");
scoreContainer.classList.add("score-container");
scoreContainer.innerHTML = "<div><h2><span>Ditt Resultat:</span><h2><br></div>"
let score = document.createElement("p");
score.innerText = points;
scoreContainer.append(score);

let wrapper = document.getElementById("wrapper");
let playspace = document.getElementById("playspace");

buttonStart.addEventListener("click", startQuiz);
buttonReplay.addEventListener("click", () => {
  location.reload();
})

function startQuiz(){
  welcomeWindow.style.display="none";
  buttonAnswer.classList.remove("hide");
  buttonContainer.classList.remove("hide");
  playspace.appendChild(createCard());
  
}

function createCard(){
  
  let card = document.createElement("form")
  let innerCard = document.createElement("div");
  innerCard.classList.add("inner-card");
  let title = document.createElement("h2");
  title.innerText = quiz[round].title;
  card.appendChild(innerCard);
  innerCard.appendChild(title);
  let checkContainer = document.createElement("div");
  checkContainer.classList.add("check-container");
  innerCard.appendChild(checkContainer);
 

  card.classList.add("questionCard");

  if(round < 9){
   for(i = 0; i<= 2; i++){
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.value = quiz[round].answers[i];
    radio.name = "answer";
    radio.id = i;
    radioButtons.push(radio)
    let label = document.createElement("label");
    label.innerText = quiz[round].answers[i];
    label.htmlFor = i;
    innerCard.appendChild(label);
    innerCard.appendChild(radio);
   }
  }
  else{
   for(i = 0; i <= 7; i++){
     let checkBox = document.createElement("input");
     checkBox.type = "checkbox";
     checkBox.value = quiz[round].answers[i];
     checkBoxes.push(checkBox);
     let label = document.createElement("label");
     label.innerText = quiz[round].answers[i];
     let boxAnswer = document.createElement("div");
     boxAnswer.classList.add("box-answer");
     boxAnswer.appendChild(label);
     boxAnswer.appendChild(checkBox);
     checkContainer.appendChild(boxAnswer);
   }
  }
  return card;
}

buttonAnswer.addEventListener("click", () => {
  checkCard();
  console.log(yourAnswers);
  if(uncheckedQuestions.length == 3){
    uncheckedQuestions = [];
    console.log("nothing answered");
    displayWarning();
    return;
  }
  else{
    round++;
    console.log(round)
    uncheckedQuestions = [];
    playspace.firstElementChild.remove();
    radioButtons = [];
    if(round == 10){
      pickPointsColor();
      wrapper.insertBefore(scoreContainer, wrapper.firstChild);
      let resultList = document.createElement("ol");
      resultList.classList.add("result-list");
      yourAnswers.forEach((answer) => {
        let li = document.createElement("li");
        li.innerText = answer;
        resultList.appendChild(li);
        buttonAnswer.classList.add("hide");
        buttonReplay.classList.remove("hide");
      })
      scoreContainer.appendChild(resultList);
    }
    else{
    playspace.appendChild(createCard());
    }
  }
})

function displayWarning(){
  containerPopup.style.visibility = "visible";
  wrapper.style.filter = "blur(10px)";
  containerPopup.style.opacity = "100%";
  window.setTimeout(function closeWarning() {
    containerPopup.style.opacity = "0%";
    containerPopup.style.visibility = "hidden";
    wrapper.style.filter = "blur(0px)";
  }, 2000);
}

function checkCard() {
  if(round == 9){
    checkBoxes.forEach((box) => {
      if(box.checked == true && quiz[round].correct.includes(box.value)){
        yourAnswers.push(`${quiz[round].title}  Ditt svar: ${box.value} - Rätt!`);
        correctCheckboxes.push(box.value);
        console.log("correct answer")
        console.log(correctCheckboxes)
      }
      else if(box.checked == true && quiz[round].correct.includes(box.value) == false){
        yourAnswers.push(`${quiz[round].title} Ditt svar: ${box.value} - Fel!`);
        correctCheckboxes = [];
      }
      else{}
    })
    if(correctCheckboxes.length == 3){
    points += 10 ;
    score.innerText = points;
    console.log("plus 10 points for check questions!")
    }
    else{}
  }
  else{
  radioButtons.forEach((btn) => {
    if(btn.checked == true && btn.value == quiz[round].correct){
      let correctAnswer = document.createElement("p");
      correctAnswer.innerText = `${quiz[round].title} Ditt svar: ${btn.value} - Rätt!`;
      correctAnswer.style.color="green";
      yourAnswers.push(correctAnswer.innerText);
      points += 10;
      console.log(points)
      score.innerText = points;
    }
    else if(btn.checked == true && btn.value != quiz[round].correct){
      yourAnswers.push(`${quiz[round].title} Ditt svar: ${btn.value} - Fel!`);
    }
    else{
        uncheckedQuestions.push("not checked")
    }
  })
 }
}

function pickPointsColor(){
  let feedBack = document.createElement("p");
  feedBack.classList.add("feedback");
  if(points <= maxPoints/4){
   score.style.color="red";
   feedBack.innerText = "Bättre kan du säkert! Försök igen!"
   feedBack.style.color="red";
   scoreContainer.appendChild(feedBack);
  }
  else if(points >= maxPoints/4 && points <= maxPoints/2){
    score.style.color="orange";
    feedBack.innerText = "Bra kämpat, men du kan nog bättre än så!"
    feedBack.style.color="orange";
    scoreContainer.appendChild(feedBack);
  }
  else if(points >= maxPoints/2 && points <= maxPoints*0.75){
    score.style.color="yellow";
    feedBack.innerText = "Bra spelat! Du hade mer än hälften rätt!"
    feedBack.style.color="yellow";
    scoreContainer.appendChild(feedBack);
  }
  else if (points == 100){
    score.style.color="green";
    feedBack.innerText = "GRATTIS, alla rätt!!"
    feedBack.style.color="green"
    scoreContainer.appendChild(feedBack);
  }
  else{
    score.style.color="green";
    feedBack.innerText = "Jättebra spelat! Kan du få alla rätt nästa gång?"
    feedBack.style.color="rgb(69, 180, 4)";
    scoreContainer.appendChild(feedBack);

  }

}






