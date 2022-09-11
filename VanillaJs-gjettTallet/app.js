let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    remainingGuesses = 3;


const guessingBoard = document.querySelector('#guessingBoard'),
    minNumber = document.querySelector('.minNumber'),  
    maxNumber = document.querySelector('.maxNumber'),
    playBtn = document.querySelector('#playBtn'),
    playInput = document.querySelector('#playInput'),
    message = document.querySelector('.message');
    
    
minNumber.textContent = min;
maxNumber.textContent = max;

guessingBoard.addEventListener("mousedown", function(e){
    if(e.target.classList.contains("replay")){
        window.location.reload();
    }
});

playBtn.addEventListener("click", function(){
    let guess = parseInt(playInput.value);
    if( isNaN(guess) || guess < min || guess > max){
        setMessage(`Skriv et tall mellom ${min} og ${max}.`, "red");
        playInput.style.borderColor = "red";
    } else {
        if(guess === winningNum){
            gameOver(true, `${winningNum} er riktig. Du vinner!`);
        } else {
            remainingGuesses -=1;
 
            if(remainingGuesses === 0){
                gameOver(false, `Game Over, du har tapt. Riktig tall er ${winningNum}`);
              } else {
                playInput.style.borderColor = "orange";
                playInput.value = "";
                setMessage(`${guess} er feil, ${remainingGuesses} forsøk igjen`, "orange");
            }
        }
    }
});


function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";

    playInput.disabled = true;
    playInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    playBtn.value = "Spill igjen";
    playBtn.classList.add("replay");
}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}