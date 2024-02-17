import { formatChoice } from './utils/formatChoice.js';
import { validateChoice } from './utils/errors.js';

const btnSend = document.querySelector("#btn-send");
const btnNewMatch = document.querySelector("#btn-new-match");
const inputChoiceUser = document.querySelector("#input-choice-user");
const sectionResult = document.querySelector("#section-result");
const resultText = document.querySelector("#result");
const computerChoiceText = document.querySelector("#p-computer-choice");
const userChoiceText = document.querySelector("#p-user-choice");

const winsCountElement = document.querySelector("#wins-count");
const lossesCountElement = document.querySelector("#losses-count");
const tiesCountElement = document.querySelector("#ties-count");

let winsCount = 0; 
let lossesCount = 0; 
let tiesCount = 0; 

const choices = ["rock", "paper", "scissors"];

let computerChoice;

let userChoice;

let result; 

const generateComputerChoice = () =>{
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = () =>{
    const outcomes = {
        rock: { rock: "tie", paper: "lose", scissors: "win" },
        paper: { rock: "win", paper: "tie", scissors: "lose" },
        scissors: { rock: "lose", paper: "win", scissors: "tie" }
    };
    result = outcomes[userChoice][computerChoice];
    displayResultHTML(); 
    changeCount();
};

const changeCount = () =>{
    if(result === "tie"){
        ++tiesCount; 
    }
    else if(result === "lose"){
        ++lossesCount; 
    }
    else if(result === "win"){
        ++winsCount; 
    }
    displayCountHTML();
};

const displayCountHTML = () =>{
    tiesCountElement.textContent = `Ties: ${tiesCount}`
    lossesCountElement.textContent = `Losses: ${lossesCount}`
    winsCountElement.textContent = `Wins: ${winsCount}`
};


const displayResultHTML = () =>{     
    computerChoiceText.textContent = `The computer played: ${computerChoice}`; 
    userChoiceText.textContent = `You played: ${userChoice}`;
    resultText.textContent = result === "tie" ? "The game is tied! ": result === "win" ? "You won!" : "You lost!";
    sectionResult.style.display = "block";
    inputChoiceUser.value = "";
};

const onSendClick = () =>{
    userChoice = formatChoice(inputChoiceUser.value);
    generateComputerChoice();
    try{
        validateChoice(userChoice);
        determineWinner();
    } catch (error){
        console.error(error.message);
    };
};

const onNewMatchClick = () =>{ 
    inputChoiceUser.value = ""; 
    sectionResult.style.display = "none";
    lossesCount = 0; 
    winsCount = 0; 
    tiesCount = 0;
    displayCountHTML();
};

btnSend.addEventListener("click", onSendClick);

btnNewMatch.addEventListener("click", onNewMatchClick);