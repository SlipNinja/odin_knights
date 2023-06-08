
class KnightTree {
    constructor(start, end){
        this.root = new kPosition(start);
        this.end = end;
        this.endSquare = null;
        this.possibleMoves = [
            {x : -2, y : -1},
            {x : -2, y : 1},
            {x : 2, y : -1},
            {x : 2, y : 1},
            {x : -1, y : -2},
            {x : 1, y : -2},
            {x : -1, y : 2},
            {x : 1, y : 2}
        ]
    }

    buildTree(array = [this.root]){
        if(this.endSquare !== null || array.length === 0) return;

        const node = array.shift();
        this.generateChilds(node);
        array = array.concat(node.children);

        this.endSquareFound(node);

        this.buildTree(array);

    }

    endSquareFound(node){
        node.children.forEach(child => {
            if(child.pos.x === this.end.x && child.pos.y === this.end.y) {
                this.endSquare = child;
            }
        });
    }

    generateChilds(node){
        this.possibleMoves.forEach(move => {
            const newPos = { x : node.pos.x + move.x, y : node.pos.y + move.y};
            if(this.inGrid(newPos)){
                node.children.push(new kPosition(newPos, node));
            }
        });
    }

    getPathToEnd(){
        let nodes = this.getNodesToEnd();
        return nodes.map(node => {
            return node.pos;
        });
    }

    getNodesToEnd(path = [this.endSquare]){
        const node = path[0];
        if(node.parent === null) return path;
        path.unshift(node.parent);
        return this.getNodesToEnd(path);
    }

    inGrid(pos){
        return (pos.x < 8) && (pos.x >= 0) && (pos.y < 8) && (pos.y >= 0);
    }
}

class kPosition {
    constructor(pos, parent = null) {
        this.pos = pos;
        this.children = [];
        this.parent = parent;
    }
}

function knightTravel(start, end) {
    const tree = new KnightTree(start, end);

    tree.buildTree();
    const path = tree.getPathToEnd();

    return path;
}


export { knightTravel };