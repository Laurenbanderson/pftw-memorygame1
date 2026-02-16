let mySquare = [];
let startingX = 50;
let startingY = 50;
let squareSize = 100;
let spacing = 150;

function setup (){
    createCanvas (1200, 1200);
    for(let i = 0; i < 4; i ++){
        mySquare.push({x: startingX, y: startingY, id: i + 1});
        startingX += 100
        }
        console.log(mySquare);
}

function draw (){
    for (let i = 0; i < mySquare.length; i++){
        fill("blue");
        rect(mySquare[i].x, mySquare[i].y, squareSize, squareSize);
        }
    }

function mousePressed(){
    for(let j = 0; j < mySquare.length; j ++){
    if (mouseX > mySquare[j].x &&
        mouseX < mySquare[j].x + squareSize &&
        mouseY > mySquare[j].y &&
        mouseY < mySquare[j].y + squareSize
    ){
        console.log("square has been clicked", mySquare[j].id);
    }
    }
}