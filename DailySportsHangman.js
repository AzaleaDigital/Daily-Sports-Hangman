const athleteName = "TOM BRADY"; // Replace this with dynamic data from your database
let guessedLetters = [];
let maxLives = 5;
let livesLeft = maxLives;

function showHangman(league) {
    document.getElementById("hangman-popup").style.display = "block";
    document.getElementById("word-display").innerText = displayWord();
}

function displayWord() {
    return athleteName.split('').map(char => guessedLetters.includes(char) ? char : (char === ' ' ? ' ' : '_')).join(' ');
}

function makeGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toUpperCase();

    if (guess && guessedLetters.indexOf(guess) === -1) {
        guessedLetters.push(guess);

        if (athleteName.toUpperCase().indexOf(guess) === -1) {
            livesLeft--;
        }

        document.getElementById("word-display").innerText = displayWord();
        document.getElementById("result").innerText = getResultMessage();

        if (livesLeft === 0 || displayWord().indexOf('_') === -1) {
            endGame();
        }

        guessInput.value = '';
    }
}

function guessEntireName() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toUpperCase();

    if (guess === athleteName.replace(/\s/g, '')) {
        document.getElementById("word-display").innerText = athleteName;
        document.getElementById("result").innerText = "Congratulations! You guessed the athlete's name!";
        endGame();
    } else {
        livesLeft--;
        document.getElementById("result").innerText = getResultMessage();

        if (livesLeft === 0) {
            endGame();
        }

        guessInput.value = '';
    }
}

function getResultMessage() {
    if (livesLeft === 0) {
        return `You're out of lives! The athlete's name was ${athleteName}.`;
    } else if (displayWord().indexOf('_') === -1) {
        return "Congratulations! You guessed the athlete's name!";
    } else {
        return `Lives left: ${livesLeft}`;
    }
}

function endGame() {
    document.getElementById("guess-input").disabled = true;
    document.querySelector("button").disabled = true;
}
