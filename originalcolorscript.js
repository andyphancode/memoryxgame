// THIS IS JUST HERE IN CASE I NEED TO GO BACK TO THE ORIGINAL NONFANCY VERSION


const gameContainer = document.getElementById("game");
const guessCount = document.querySelector("#guesscount");
const bestScore = document.querySelector("#bestscore");
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
gameContainer.classList.add("hidden");
reset.classList.add("hidden");


start.addEventListener('click',function(){
  gameContainer.style.opacity = 1;
  reset.style.opacity = 1;
  gameContainer.classList.remove("hidden");
  start.classList.add("hidden");
  reset.classList.remove("hidden");
})
let guesses = 0;
guessCount.innerText = `${guesses}`;


if (localStorage.length === 0){
  bestScore.innerText = "X";
} else {
  bestScore.innerText = `${localStorage.getItem("bestscore")}`;
}



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// helper function to update guess score
function guessUpdate() {
  guesses += 1;
  guessCount.innerText = `${guesses}`;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let selectedColor = "";
let firstSelection; 
let matchCount = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  event.target.style.backgroundColor = event.target.classList[0];
  if (selectedColor == ""){
    selectedColor = event.target.classList[0];
    event.target.classList.add("disabled");
    firstSelection = event.target;
  } else if (selectedColor == event.target.classList[0]) {
    selectedColor = "";
    firstSelection.classList.add("disabled");
    event.target.classList.add("disabled");
    guessUpdate();
    matchCount += 1;
    if (matchCount === 5){
      if(guesses < localStorage.getItem("bestscore") || localStorage.getItem("bestscore") == undefined){
        localStorage.setItem("bestscore", guesses);
        bestScore.innerText = `${localStorage.getItem("bestscore")}`;
      }
      setTimeout(function(){
        alert(`Your score was ${guesses}`);
      },1);
      
    }
  } else {
    guessUpdate();
    selectedColor = "";
    firstSelection.classList.remove("disabled");
    gameContainer.classList.add("disabled");
    setTimeout(function(){
      firstSelection.style.backgroundColor = "";
      event.target.style.backgroundColor = "";
      gameContainer.classList.remove("disabled");
    },1000)
  }
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */