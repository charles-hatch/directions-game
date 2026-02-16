// player.js
// Player model (position + facing)

const DIRECTIONS = ["north", "east", "south", "west"];

function rotate(orientation, delta) {
  const i = DIRECTIONS.indexOf(orientation);
  return DIRECTIONS[(i + delta + DIRECTIONS.length) % DIRECTIONS.length];
}

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
        case "north":
          this.y -= 1;
          break;
        case "south":
          this.y += 1;
          break;
        case "west":
          this.x -= 1;
          break;
        case "east":
          this.x += 1;
          break;
        default:
          break;
      }
    },

    turnLeft() {
      this.orientation = rotate(this.orientation, -1);
    },

    turnRight() {
      this.orientation = rotate(this.orientation, 1);
    },
  };
}
