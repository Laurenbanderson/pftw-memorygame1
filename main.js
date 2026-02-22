
const DOWN = 'down';
const UP = 'up';
let startingX = 100;
let startingY = 100;
let cards = [];
const gameState = {
    totalPairs: 8,
    flippedCards: [],
    numMatched: 0,
    attempts: 0,
    waiting: false
};
let cardfaceArray = [];

let cardback;
function preload() {
    cardback = loadImage('images/smallcardback.png');
    cardfaceArray = [
        loadImage('images/ax.png'),
        loadImage('images/beet.png'),
        loadImage('images/burger.png'),
        loadImage('images/chicken.png'),
        loadImage('images/farm.png'),
        loadImage('images/fish.png'),
        loadImage('images/note.png'),
        loadImage('images/sword.png'),
    ]
}

function setup() {
    createCanvas(650, 700);
    let selectedFaces = [];
    for (let z = 0; z < 8; z++) {
        const randomIdx = floor(random(cardfaceArray.length));
        const face = cardfaceArray[randomIdx];
        selectedFaces.push(face);
        selectedFaces.push(face);
        // remove the used card so it's not showed more than once 
        cardfaceArray.splice(randomIdx, 1);
    }
    selectedFaces = shuffleArray (selectedFaces);
    // this shows how many rows we have 
    for (let j = 0; j < 4; j++) {
        //this shows how many cards are in each row
        for (let i = 0; i < 4; i++){
            const faceImage = selectedFaces.pop();
            cards.push(new Card(startingX, startingY, faceImage));
            //spacing between cards
            startingX += 120;
        }
        //spacing betweek cards
        startingY += 120;
        //keeps the cards starting the correct spot
        startingX = 100;
    }
}

function draw () {
    background(204, 85, 0);
    if (gameState.numMatched === gameState.totalPairs) {
        fill('navy');
        textSize (40);
        text('You win!!!', 225, 75);
        noLoop();
    }
    for (let k = 0; k < cards.length; k++) {
        if(!cards[k].isMatch) {
            cards[k].face = DOWN;
        }
        cards[k].show();
    }
    noLoop();
    gameState.flippedCards.length = 0;
    gameState.waiting = false;
    fill(255);
    textSize(18);
    text('Match the Stardew Valley items!', 100, 25);
    text('Attempts ' + gameState.attempts, 100, 600);
    text('Matches ' + gameState.numMatched, 100, 620); 
}

function mousePressed () {
    if (gameState.waiting) {
        return;
    }
    for (let k = 0; k < cards.length; k++) {
        // first check flipped cards length and then we can trigger the flip
        if (gameState.flippedCards.length < 2 && cards[k].didHit(mouseX, mouseY)) {
            console.log('flipped', cards[k]);
            gameState.flippedCards.push(cards[k]);
        }
    }
    if (gameState.flippedCards.length == 2) {
        gameState.attempts++;
        if (gameState.flippedCards[0].cardFaceImage === gameState.flippedCards[1].cardFaceImage) {
            //if matched!
            //mark careds as matched so they stay face up
            gameState.flippedCards [0].isMatch = true;
            gameState.flippedCards [1].isMatch = true;
            //empty the flipped cards array 
            gameState.flippedCards.length = 0;
            //increment the score
            gameState.numMatched++;
            loop();
        } else {
            gameState.waiting = true;
            const loopTimeout = window.setTimeout(() => {
                loop();
                window.clearTimeout(loopTimeout);
            }, 1000)
        }
    }
}

class Card {
    constructor (x, y, cardfaceImage){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.face = DOWN;
        this.cardFaceImage = cardfaceImage;
        this.isMatch = false;
        this.show();
    }
    show () {
        if(this.face === UP || this.isMatch) {
        fill (100, 200, 100);
        rect(this.x, this.y, this.width, this.height, 8);
        image (this.cardFaceImage, this.x, this.y, 100, 100);
        } else {
            fill(135, 206, 235);
        rect(this.x, this.y, this.width, this.height, 8);
        image (cardback, this.x, this.y, 100, 100);
        }
    }

    didHit (mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
                this.flip();
                return true;
            } else {
                return false;
            }


    }
    flip () {
        if (this.face === DOWN) {
            this.face = UP;
        } else {
            this.face = DOWN;
        }
        this.show();
    }
} 
function shuffleArray (array) {
    let counter = array.length;
    while (counter > 0) {
        // picks random index 
        const idx = Math.floor(Math.random() * counter);
        // decrease by 1 counter (decrement)
        counter--;
        // swap the last element with it
        const temp = array[counter];
        array[counter] = array[idx];
        array [idx] = temp;
    }
    return array;
}  
