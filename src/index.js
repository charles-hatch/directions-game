// index.js
// src/index.js
import "./styles.css";
import { greet } from "./board.js";
import testImage from "./resturauntImg.png"

import { makeBoard } from "./board.js";

console.log(greet);

makeBoard();


//self memos
//default vs named exports, i should only export one or the other


// const image = document.createElement("img");
// image.src = testImage;

// document.body.appendChild(image);
//importing an image