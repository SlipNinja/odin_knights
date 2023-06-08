import knightImg from "./images/chevalier.png";
import treasureImg from "./images/treasure.png";

import { knightTravel } from './knight.js';

function buildPage() {
    const mainElement = document.createElement("div");
    mainElement.id = "mainElement";

    const boardSide = document.createElement("div");
    boardSide.id = "boardSide";

    const menuSide = document.createElement("div");
    menuSide.id = "menuSide";

    boardSide.appendChild(buildBoard());
    menuSide.appendChild(buildProcessButton());

    mainElement.appendChild(boardSide);
    mainElement.appendChild(menuSide);

    document.body.appendChild(mainElement);

    addBoardClickEvents();
}

function buildBoard() {
    const board = document.createElement("div");
    board.id = "board";

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement("div");
            square.classList.add("square");

            if((i+j)%2 === 0){
                square.classList.add("white");
            } else {
                square.classList.add("dark");
            }

            const imgContainer = new Image();
            imgContainer.classList.add("imgContainer")

            square.appendChild(imgContainer);
            board.appendChild(square);
        }
    }

    return board;
}

function buildProcessButton() {
    const btnProcess = document.createElement("button");
    btnProcess.id = "btnProcess";
    btnProcess.innerHTML = "Find path to treasure";
    btnProcess.onclick = (e) => {
        const imgs = Object.values(document.getElementsByClassName('imgContainer'));
        let start = null;
        let end = null;

        for (let i = 0; i < imgs.length; i++) {
            const container = imgs[i];
            if(container.src === knightImg) start = indexToPosition(i);
            if(container.src === treasureImg) end = indexToPosition(i); 
        }

        if(start === null || end === null) return;
        
        //console.log(`Start : ${start.x} - ${start.y}`);
        //console.log(`Treasure : ${end.x} - ${end.y}`);

        const travel = knightTravel(start, end);
        displayTravel(travel);
    };

    return btnProcess;
}

function displayTravel(travel) {
    travel.forEach(position => {
        console.log(position);
    });
}

function addBoardClickEvents(){

    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++) {

        //const pos = indexToPosition(i);

        // Right click
        squares[i].oncontextmenu = (e) => {
            clearImgContainerFrom(treasureImg);
            squares[i].children[0].src = treasureImg;
            return false; // Cancel default contextual menu
        };

        // Left click
        squares[i].onclick = (e) => {
            clearImgContainerFrom(knightImg);
            squares[i].children[0].src = knightImg;
        };
    }
}

function clearImgContainerFrom(img){
    const imgs = Object.values(document.getElementsByClassName('imgContainer'));

    imgs.map(function(container) { 
        if(container.src === img) container.src = "";
    });
}

function indexToPosition(index) {
    const rowPos = Math.floor(index / 8);
    const colPos = index % 8;

    return { y : rowPos, x : colPos };
}

function positionToIndex(x, y){
    return x + (y * 8);
}

export { buildPage };