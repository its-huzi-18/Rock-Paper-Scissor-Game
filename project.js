let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const mainMsg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const genCompChoice = ()=>{
    const option = ["rock","paper","scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return option [randIdx];
};
 //Draw
const drawGame = () => {
    mainMsg.innerText = "Game Was Draw! Play Again.";
    mainMsg.style.backgroundColor = "darkcyan";
};

 //What does the choice select both 
const playGame = (userChoice) =>{
 //Generate Comp Choice
 const compChoice = genCompChoice();
  ///Result
  const showWinner = (userWin,userChoice,compChoice) =>{
if(userWin){
    userScore++;
    userScorePara.innerText = userScore;
    mainMsg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
    mainMsg.style.backgroundColor = "green";
}else{
    compScore++;
    compScorePara.innerText = compScore;
    mainMsg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
    mainMsg.style.backgroundColor = "red";
}}

 if(userChoice === compChoice){
   //Draw Game
   drawGame();
 }
 else{
    let userWin = true;
    if(userChoice === "rock"){
        //paper / scissor
     userWin = compChoice === "paper" ?false:true
    }
    else if(userChoice === "paper"){
        //rock / scissor
        userWin = compChoice === "scissor" ?false:true;
    }
    else { //user === scissor
        //comp === rock / paper
        userWin = compChoice === "rock"?false:true
    }
    showWinner(userWin,userChoice,compChoice);
 }
}

///User Choice
choices.forEach((choice)=>{
    choice.addEventListener(("click"),()=>{
        const userChoice = choice.getAttribute("id")
    //  console.log("Choice was Clicked",userChoice);
     playGame(userChoice);
    });
})