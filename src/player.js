



export function currentPosition(board) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[y].length; y++) {
            if (board[x][y].player === "player") {
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

        move() {
            console.log("EXECUTE MOVE")
            switch (this.orientation) {
                case "north": this.y -= 1;
                    // Code to execute if expression === value1
                    break;
                case "south": this.y += 1;
                    // Code to execute if expression === value2
                    break;

                case "west": this.x -= 1;
                    // Code to execute if expression === value2
                    break;
                case "east": this.x += 1;
                    // Code to execute if expression === value1
                    break;


                default: return;
                // Code to execute if no case matches
            }
        },

        // moveUp() { this.y -= 1; },
        // moveDown() { this.y += 1; },
        // moveLeft() { this.x -= 1; },
        // moveRight() { this.x += 1; },

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

