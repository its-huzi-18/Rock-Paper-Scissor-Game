let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const mainMsg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const playerSelectionDisplay = document.querySelector("#player-selection-display");
const computerSelectionDisplay = document.querySelector("#computer-selection-display");

// Function to get image path for choice
const getImagePath = (choice) => {
    switch(choice) {
        case "rock": return "Images/rock.png";
        case "paper": return "Images/paper.png";
        case "scissor": return "Images/scissors.png";
        default: return "";
    }
};

// Function to update selection displays
const updateSelectionDisplay = (element, choice, isPlayer = false) => {
    if (choice) {
        element.innerHTML = `<img src="${getImagePath(choice)}" alt="${choice}">`;
        if (isPlayer) {
            element.parentElement.classList.add("selected");
        }
    } else {
        element.innerHTML = `<p class="selection-text">${element === playerSelectionDisplay ? 'Waiting for your move' : 'Waiting for computer'}</p>`;
        if (isPlayer) {
            element.parentElement.classList.remove("selected");
        }
    }
};

const genCompChoice = () => {
    const option = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return option[randIdx];
};

// Draw game
const drawGame = () => {
    mainMsg.innerText = "Game Was Draw! Play Again.";
    mainMsg.style.backgroundColor = "darkcyan";
    mainMsg.style.color = "white";
};

// Show winner with enhanced visual feedback
const showWinner = (userWin, userChoice, compChoice) => {
    // Update selection displays
    updateSelectionDisplay(playerSelectionDisplay, userChoice);
    updateSelectionDisplay(computerSelectionDisplay, compChoice);

    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        mainMsg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        mainMsg.style.backgroundColor = "#4CAF50";
        mainMsg.style.color = "white";

        // Add animation effect for win
        playerSelectionDisplay.parentElement.style.borderColor = "#4CAF50";
        playerSelectionDisplay.parentElement.style.boxShadow = "0 0 20px rgba(76, 175, 80, 0.8)";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        mainMsg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        mainMsg.style.backgroundColor = "#F44336";
        mainMsg.style.color = "white";

        // Add animation effect for loss
        computerSelectionDisplay.parentElement.style.borderColor = "#F44336";
        computerSelectionDisplay.parentElement.style.boxShadow = "0 0 20px rgba(244, 67, 54, 0.8)";
    }

    // Reset selection display borders after a delay
    setTimeout(() => {
        playerSelectionDisplay.parentElement.style.borderColor = "";
        playerSelectionDisplay.parentElement.style.boxShadow = "";
        computerSelectionDisplay.parentElement.style.borderColor = "";
        computerSelectionDisplay.parentElement.style.boxShadow = "";
    }, 1500);
};

// Play the game
const playGame = (userChoice) => {
    // Remove any previous selection highlights
    choices.forEach(choice => choice.classList.remove("selected"));

    // Highlight the user's choice
    const selectedChoice = document.getElementById(userChoice);
    if (selectedChoice) {
        selectedChoice.classList.add("selected");
    }

    // Generate computer choice
    const compChoice = genCompChoice();

    // Update player selection display immediately
    updateSelectionDisplay(playerSelectionDisplay, userChoice, true);

    // Show computer "thinking" animation
    computerSelectionDisplay.innerHTML = `<div class="selection-thinking">...</div>`;

    // Add a small delay to simulate computer "thinking"
    setTimeout(() => {
        if (userChoice === compChoice) {
            // Draw game
            drawGame();

            // Update computer selection display
            updateSelectionDisplay(computerSelectionDisplay, compChoice);

            // Add draw animation
            playerSelectionDisplay.parentElement.style.borderColor = "darkcyan";
            computerSelectionDisplay.parentElement.style.borderColor = "darkcyan";
            playerSelectionDisplay.parentElement.style.boxShadow = "0 0 20px rgba(0, 139, 139, 0.8)";
            computerSelectionDisplay.parentElement.style.boxShadow = "0 0 20px rgba(0, 139, 139, 0.8)";

            setTimeout(() => {
                playerSelectionDisplay.parentElement.style.borderColor = "";
                computerSelectionDisplay.parentElement.style.borderColor = "";
                playerSelectionDisplay.parentElement.style.boxShadow = "";
                computerSelectionDisplay.parentElement.style.boxShadow = "";
            }, 1500);
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissor" ? false : true;
            } else { // user === scissor
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
    }, 800); // 800ms delay to show "thinking"
};

// User choice event listeners
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Initialize the displays
updateSelectionDisplay(playerSelectionDisplay, null);
updateSelectionDisplay(computerSelectionDisplay, null);