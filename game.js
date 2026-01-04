// Game state
let playerScore = 0;
let computerScore = 0;

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerIconEl = document.getElementById('player-icon');
const computerIconEl = document.getElementById('computer-icon');
const resultEl = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const resetBtn = document.getElementById('reset');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');

// Choice emojis
const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// Choice names
const choiceNames = {
    rock: 'Քար',
    paper: 'Թուղթ',
    scissors: 'Մկրատ'
};

// Get computer's random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function playRound(playerChoice, computerChoice) {
    // Remove winner classes
    playerChoiceEl.classList.remove('winner');
    computerChoiceEl.classList.remove('winner');
    resultEl.classList.remove('win', 'lose', 'tie');

    // Update icons
    playerIconEl.textContent = choiceEmojis[playerChoice];
    computerIconEl.textContent = choiceEmojis[computerChoice];

    // Check for tie
    if (playerChoice === computerChoice) {
        resultEl.classList.add('tie');
        resultEl.querySelector('p').textContent = `Ոչ-ոքի! Երկուսն էլ ընտրեցին ${choiceNames[playerChoice]}`;
        return 'tie';
    }

    // Determine winner
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winConditions[playerChoice] === computerChoice) {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        resultEl.classList.add('win');
        resultEl.querySelector('p').textContent = `Դուք հաղթեցիք! ${choiceNames[playerChoice]} հաղթում է ${choiceNames[computerChoice]}`;
        playerChoiceEl.classList.add('winner');
        return 'win';
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        resultEl.classList.add('lose');
        resultEl.querySelector('p').textContent = `Դուք պարտվեցիք! ${choiceNames[computerChoice]} հաղթում է ${choiceNames[playerChoice]}`;
        computerChoiceEl.classList.add('winner');
        return 'lose';
    }
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        playRound(playerChoice, computerChoice);
    });
});

// Reset score
resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerIconEl.textContent = '?';
    computerIconEl.textContent = '?';
    resultEl.classList.remove('win', 'lose', 'tie');
    resultEl.querySelector('p').textContent = 'Ընտրեք ձեր զենքը!';
    playerChoiceEl.classList.remove('winner');
    computerChoiceEl.classList.remove('winner');
});

