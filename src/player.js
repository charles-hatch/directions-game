//player.js
export function currentPosition(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[x].length; x++) {
            if (board[y][x].player === "player") {
                return { y, x };
            }
        }
    }
}
//player factory function

const directions = ["north", "east", "south", "west"];


export function createPlayer(startY, startX) {
    return {
        y: startY,
        x: startX,


        orientation: "north",

        getPosition() {
            return { y: this.y, x: this.x };
        },

        getOrientation() {
            return this.orientation;
        },

        move() {
            console.log("EXECUTE MOVE")
            switch (this.orientation) {
                case "north": this.y -= 1; break;
                case "south": this.y += 1; break;
                case "west": this.x -= 1; break;
                case "east": this.x += 1; break;
            }
        },

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

