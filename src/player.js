//player.js
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

