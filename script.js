// set variable for game, score and button elements
const gameContainer = document.getElementById("game");
const guessCount = document.querySelector("#guesscount");
const bestScore = document.querySelector("#bestscore");
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
// start with game container and reset button hidden
gameContainer.classList.add("hidden");
reset.classList.add("hidden");

// if start is clicked, fade game container and reset button in
start.addEventListener('click',function(){
  gameContainer.style.opacity = 1;
  reset.style.opacity = 1;
  gameContainer.classList.remove("hidden");
  // also collapse start button
  start.classList.add("hidden");
  reset.classList.remove("hidden");
})
// initialize guess score variable
let guesses = 0;
guessCount.innerText = `${guesses}`;

// initialize localStorage of "high" score
if (localStorage.length === 0){
  bestScore.innerText = "X";
} else {
  bestScore.innerText = `${localStorage.getItem("bestscore")}`;
}


// declare colors array (note for scalability: the colors here are basically useless
// because we used images, but the values are still unique so you could technically
// add more memory cards via adding CSS classes that match things you add to this array)
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
// also added appending of a cover image to each div
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // Create a new img
    const topImage = document.createElement("img");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // Give img some attributes
    topImage.setAttribute("src","default.jpg");
    topImage.classList.add("topImage");

    newDiv.append(topImage);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// declare a storage variable for a value(color, but could be anything really) and element, as well as measuring matchcount to know when game is done
let selectedColor = "";
let firstSelection; 
let matchCount = 0;

// what happens on click
function handleCardClick(event) {
  // default route, just added this conditional as the only clickable element is the overlaying image
  if (event.target.tagName === 'IMG'){
    // set the overlay image to 0 opacity
    event.target.style.opacity = 0;
    // if no value was stored in the value variable
    if (selectedColor == ""){
      // set the variable to a value (color, or whatever it is)
      selectedColor = event.target.parentElement.classList[0];
      // disable re-clicking of the card you just clicked
      event.target.parentElement.classList.add("disabled");
      // store the card div in a variable
      firstSelection = event.target.parentElement;
      // if the next card you select has matching class values
    } else if (selectedColor == event.target.parentElement.classList[0]) {
      // reset storage variable
      selectedColor = "";
      // disable both cards from being clicked
      firstSelection.classList.add("disabled");
      event.target.classList.add("disabled");
      // update guesses
      guessUpdate();
      // Check to see if all matches done. scalability note: add 1 for every pair of cards added. localStorage updated if done and high score too
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
      // if the cards didn't match
    } else {
      // update guess count
      guessUpdate();
      // reset storage variable
      selectedColor = "";
      // disable the cards from being clicked for a bit
      firstSelection.classList.remove("disabled");
      gameContainer.classList.add("disabled");
      //disable reset from being clicked for a bit
      reset.classList.add("disabled");
      reset.classList.add("hidden")
      // function to return opacity to overlaying images
      setTimeout(function(){
        // last card clicked overlaying image opacity restore
        event.target.style.opacity = 1;
        // card before that
        firstSelection.firstElementChild.style.opacity = 1;
        // reinstate interactability
        gameContainer.classList.remove("disabled");
        reset.classList.remove("disabled");
        reset.classList.remove("hidden");
      },1000)
    }
  }
    
}

// reset button, deletes game container divs and recalls create divs function
reset.addEventListener('click', function(){
  // delete divs/cards
  gameContainer.innerHTML = '';
  // reset storage variables
  selectedColor = '';
  matchCount = 0;
  // reset guess count
  guesses = 0;
  guessCount.innerText = `${guesses}`;
  // reshuffle array and recreate divs
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
})

// when the DOM loads
createDivsForColors(shuffledColors);

/* */