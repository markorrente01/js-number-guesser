// game settings
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

// get ui elements
const parentElement = document.querySelector('div'),
    guessInput = document.querySelector('#guess__input'),
    submit = document.querySelector('#guess__submit'),
    message = document.querySelector('.message'),
    minNum = document.querySelector('.minNum'),
    maxNum = document.querySelector('.maxNum');

//show the max and min in th ui
minNum.textContent = min;
maxNum.textContent = max;

// handle submit event
submit.addEventListener('click', ()=>{
    // convert the input value from string to number using parseInt()
    const guesses = parseInt(guessInput.value);
    if (isNaN(guesses) || guesses < min || guesses > max) {
        setMessage(`Enter a valid number between ${min} and ${max}`, 'red');
        return;
    }
    if (guesses === winningNum) {
        endGame(true, 'Correct guess, You win!');
        return;
    } 
        guessesLeft--
        if (guessesLeft === 0) {
            endGame(false, `You loose, the correct guess is ${winningNum}`);
            return;
        }
        else{
            // continue the game
            setMessage(`${guessInput.value} is not correct. ${guessesLeft} guesses left.`, 'red');
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            return;
        }
})
function endGame(won, msg) {
    const color = won ? 'green' : 'red'; 
    guessInput.disabled = true;
    guessInput.style.border = `2px solid ${color}`;
    setMessage(msg, color);
    submit.textContent = 'Play again';
    submit.classList.add('play-again');
}
// use event delegation to target the submit button for the game restart
parentElement.addEventListener('mousedown', (e)=>{
    if (e.target.classList.contains('play-again')) {
        resetGame();
    }
})
function resetGame() {
    guessesLeft = 5;
    winningNum = getRandomNum(min, max);
    guessInput.disabled = false;
    guessInput.value = '';
    guessInput.style.borderColor = '';
    setMessage('');
    submit.textContent = 'Guess';
    submit.classList.remove('play-again');
}
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}