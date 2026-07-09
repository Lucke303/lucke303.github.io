//Defines the empty variable of userInput
let userInput;

//Declares variables for HTML Elements
let colorBlockContainer = document.getElementById('colorBlock');
let colorBlockH1 = document.getElementById('colorBlockH1');
let colorBlockH3 = document.getElementById('colorBlockH3');
let colorBlockError = document.getElementById('colorBlockError');
let submit = document.getElementById('submitBtn');


// outputs eiter a letter A-F or number 0-9
const getvalue = () => {
    let value = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    return value[Math.floor(Math.random()*16)]
}

//Runs getvalue() six times to generate a psudo random HEX-code
const genHex = () => {
    return '#' + getvalue() + getvalue() + getvalue() + getvalue() + getvalue() + getvalue();
}

//creates a variable to store the generated Hex-code
let currentHexCode = genHex()
let pastHexArrey = [currentHexCode];

//Sets colorBlock equal to generated HEX-code
colorBlockContainer.style.backgroundColor = currentHexCode;

//Stores the generated HEX-code in hexCode
function storeNewHex() {
    currentHexCode = (genHex());
    pastHexArrey.push(currentHexCode)
}


//Defines acceptable input values as array
const acceptableValues = ['#', 'A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//function to compare a correct HEX-code userInput to generated input
let runCompare = () => {
    //checks if user input has any invalid characters for correct Hex-Code
    let resultsArray = [] // Empty array setup for compare with acceptableValues
    for (let i = 0; i < userInput.length; i++) { //Loops userInput characters
        for (let j = 0; j < acceptableValues.length; j++) { //Loops accepableValues
            if (userInput[i] === acceptableValues[j]){ // Checks if the character from userInput is valid compared with acceptableValues array
                 resultsArray.push(userInput[i]); //If character is valid it gets put into results array.
            }
        }
    }
    //Checks for unexpected use of #
     for (let i = 1; i < resultsArray.length; i++) { //Loops userInput characters
        if (resultsArray[i] === '#') {
            colorBlockError.innerHTML = 'Check placement of "#"';
            colorBlockError.style.display = 'block';
            return;
        }
    }
    resultsArray = resultsArray.join(''); // Joins resultsArray into one single string
//Start of actual game.
    if (resultsArray === userInput) { //Validates the userInput against resultsArray for acceptableValues.
        if (userInput.length === 6 || userInput.length === 7) {
            if (userInput.length === 7 && userInput[0] !== '#') { //Checks if user input is too long without #
                colorBlockError.innerHTML = 'Input too long';
                colorBlockError.style.display = 'block';
            } else if (userInput.length === 6 && userInput[0] === '#') { //Checks if user input is too short with #
                colorBlockError.innerHTML = 'Input too short';
                colorBlockError.style.display = 'block';
            } else if (userInput.length === 7 && userInput[0] === '#') { //Validates a HEX-code with # in start of userInput 
                if (userInput === currentHexCode) { //It's a match, user wins.
                    userRight();
                } else { //It's not a match, user fails.
                    userWrong()
                }
            } else if (userInput.length === 6 && userInput[0] !== '#') { //adds # to a valid HEX-code with 6 characters and no #.
                userInput = '#' + userInput 
                    if (userInput === currentHexCode) { //It's a match, user wins.
                        userRight();
                    } else { //It's not a match, user fails.
                        userWrong()
                    }
            } 
        } else if (userInput.length < 6) { //Invalidates short userInput
            colorBlockError.innerHTML = 'Input too short';
            colorBlockError.style.display = 'block';
        } else { //Invalidates long userInput
            colorBlockError.innerHTML = 'Input too long';
                colorBlockError.style.display = 'block';
        }
    } else { //Invalidates unacceptable characters
        colorBlockError.innerHTML = 'Invalid character used';
        colorBlockError.style.display = 'block';
    }
}

//Runs when user guess is right
let userRight = () => {
    submit.removeEventListener('click', submitGame);
    submit.value = 'New';
    submit.addEventListener('click', resetGame);
    colorBlockContainer.style.backgroundColor = 'Green';
    colorBlockH1.innerHTML = "You're right!";
    colorBlockH3.innerHTML = currentHexCode.substring(0, 7);
    colorBlockH3.style.display = 'block';
    //run storeScore
    //Show button that run resetGame
}

//Runs when user guess is wrong
let wrongGuess = 0;
let userWrong = () => {
    wrongGuess++
    if (wrongGuess === 1) {
        colorBlockH1.innerHTML = "Two tries to go!";
        colorBlockH3.style.display = 'block';
        colorBlockH3.innerHTML = currentHexCode.substring(0, 3);
    } else if (wrongGuess === 2) {
    colorBlockH1.innerHTML = "One try left!";
    colorBlockH3.innerHTML = currentHexCode.substring(0, 5);
    } else if (wrongGuess === 3) {
        userLoser();
    }
}

let userLoser = () => {
    submit.removeEventListener('click', submitGame);
    submit.value = 'New';
    submit.addEventListener('click', resetGame);
    colorBlockContainer.style.backgroundColor = 'Red';
    colorBlockH1.innerHTML = "You lose!";
    colorBlockH3.style.display = 'block';
    colorBlockH3.innerHTML = currentHexCode.substring(0, 7);
    //Show 'Try again' button
    //Run resetGame
}

let storeScore = () => {
    //pushes correct guess into scoreColorBlock
    //Timed guess?
}

//Resets game
let resetGame = () => {
    wrongGuess = 0;
    submit.removeEventListener('click', resetGame);
    submit.value = 'Guess';
    submit.addEventListener('click', submitGame);
    colorBlockH1.innerHTML = "What color am I?";
    colorBlockH3.style.display = 'none';
    storeNewHex();
    colorBlockContainer.style.backgroundColor = currentHexCode;

}

let submitGame = () => {
    userInput = document.getElementById('userInput').value;
    colorBlockError.style.display = 'none';
    userInput = userInput.toUpperCase();
    runCompare();
}

submit.addEventListener('click', submitGame);
