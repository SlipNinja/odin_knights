
function buildPage() {
    const mainElement = document.createElement("div");
    mainElement.id = "mainElement";

    const boardSide = document.createElement("div");
    boardSide.id = "boardSide";

    const menuSide = document.createElement("div");
    menuSide.id = "menuSide";

    boardSide.appendChild(buildBoard());

    mainElement.appendChild(boardSide);
    mainElement.appendChild(menuSide);

    document.body.appendChild(mainElement);

    addClickEvents();
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

            board.appendChild(square);
        }
    }

    return board;
}

function addClickEvents(){

    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++) {

        const row = Math.floor(i / 8);
        const col = i % 8;

        console.log("COUCOU");
        squares[i].onclick = (e) => {
            console.log(`X : ${row}`);
            console.log(`Y : ${col}`);
        };
    }
}


export { buildPage };