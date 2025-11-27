



export function currentPosition(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x].player === "player") {
                return { x, y };
            }
        }
    }
}


//player factory function

const directions = ["north", "east", "south", "west"];


export function createPlayer(startX, startY) {
    return {
        x: startX,
        y: startY,

        orientation: "north",

        getPosition() {
            return { x: this.x, y: this.y };
        },

        getOrientation() {
            return this.orientation;
        },

        moveUp() { this.y -= 1; },
        moveDown() { this.y += 1; },
        moveLeft() { this.x -= 1; },
        moveRight() { this.x += 1; },

        turnLeft() {
            let idx = directions.indexOf(this.orientation);
            this.orientation = directions[(idx - 1 + directions.length) % directions.length];


        },

        turnRight() {
            let idx = directions.indexOf(this.orientation);
            this.orientation = directions[(idx + 1) % directions.length];
        }
    };


}
