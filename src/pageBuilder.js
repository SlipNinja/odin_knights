
function buildPage() {
    const mainElement = document.createElement("div");
    mainElement.id = "mainElement";

    mainElement.innerHTML = "HELLO WORLD";


    document.body.appendChild(mainElement);
}


export { buildPage };