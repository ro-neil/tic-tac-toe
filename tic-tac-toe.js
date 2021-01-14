
// Global Variables
var letterState = "X";      // the letter to be played, always starts with an "X"
var clickCount = 0;         // the number of clicks made
var selectedSquare;         // stores a square for processing
var squareDivs;             // Array of divs inside GameBoard object  

// Main Method
window.onload = () => {
    
    let gameBoard = document.getElementById("board");  // game board div object
    squareDivs = gameBoard.querySelectorAll("div"); // Array of divs inside GameBoard object
    
    // Set each div inside the game board to have the provided CSS class square
    for (let i = 0; i < squareDivs.length; i++){
        selectedSquare = squareDivs[i];
        selectedSquare.className = "square";
        selectedSquare.id = i;  // Set id numbers of grid squares to values ranging from 0 to 8
        initializeMouseOperations(selectedSquare); // setup of mouse events
    }
}

// Setup Mouse Listeners
initializeMouseOperations = (square) => {
    
    let newGameButton = document.getElementById("new-game-button");  // The "New Game" button
    
    // Click listener
    square.onclick = function(){
        processPlay(square);  // processes the next play
    }
    // Mouse hover listener
    square.onmouseover = function(){
        square.classList.add("hover");
    }
    // Mouse leave listener
    square.onmouseleave = function(){
        square.classList.remove("hover");
    }
    // New Game listener
    newGameButton.onclick = function(){
        RunNewGame();
    }
}

 // Change click listener operation
changeClickOperation = (square) => {
    square.onclick = function(){
        console.log("Tile has been disabled!");
    }
}

// Main functionality
processPlay = (square) => {
    clickCount += 1;    // increment click count
    changeClickOperation(square); // disable clicking for this square
    square.classList.add(letterState);  // add letterState to classlist 
    square.textContent = letterState; 
    
    /* listen for at least five (5) clicks before checking for a winner */
    if(clickCount >= 5)   
        winnerCheck(); 
    
    /* Switch letter state */
    switch (letterState) {
        case 'X':
            letterState = "O"
            break;
        case 'O':
            letterState = "X"
            break;
        default:
            break;
    }
}

// Returns true if a winning play is made
winnerCheck = () => {
    //let winnerIsFound = false;
    let message; // the winner display message
    let tripples = "";      // win confirmation string
    let winningPatterns =   [ 
            // Rows
            [0,1,2],
            [3,4,5],
            [6,7,8],
            // Columns
            [0,3,6],
            [1,4,7],
            [2,5,8],
            // Diagonals
            [0,4,8],
            [2,4,6],
    ]

    let index; // current index from winning patterns
    for(i = 0; i < winningPatterns.length; i++) {
        /* Concatenates letters based on winning patterns */
        for(j = 0; j < 3; j++){
            index = winningPatterns[i][j];
            if (squareDivs[index].textContent != "") // concat only if square has been previously clicked
                tripples += squareDivs[index].textContent; // get text from div at index 
        }
        /* Checks the string to see if it matches three X's or three O's */
        if(tripples === "XXX"){
            // Setup winner display message
            message = "Congratulations! X is the Winner!";
            break;
        } else if (tripples === "OOO"){
            // Setup winner display message
            message = "Congratulations! O is the Winner!";
            break;
        } else {
            tripples = "";  // reset the confirmation string if no winner is found
        }
    }
    /* If winning message is set */
    if(message){
        document.getElementById("status").classList.add("you-won");
        document.getElementById("status").textContent = message;

        /* Disable all square clicks */
        for (i = 0; i < squareDivs.length; i++){ // Can be optimized
            selectedSquare = squareDivs[i];
            changeClickOperation(selectedSquare); 
        }
    }
}

// Reset game // -  Can br optimized
RunNewGame = () => {
    // Reset class attributes and inner HTML data
    for(i = 0; i < 9; i++){
        document.getElementById(i).textContent = "";
        // Remove all "X" classes
        if (document.getElementById(i).classList.contains("X")){
            document.getElementById(i).classList.remove("X");
        }
        // Remove all "O" classes
        if (document.getElementById(i).classList.contains("O")){
            document.getElementById(i).classList.remove("O");
        }
    }
    // Reset win state
    document.getElementById("status").classList.remove("you-won");
    document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O.";
    // Reset state variables
    letterState = "X";
    clickCount = 0;
    // Run main method
    window.onload(); // reloads the page
}


function getElement(property, value) {
    switch (property) {
        case 'id':
            
            break;
        case 'tag':
            
            break;
        case 'class':
            
            break;
    
        default:
            break;
    }
}







