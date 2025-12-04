import { readFileSync } from "node:fs";

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [+1, -1],
  [-1, 1],
];

const ADJACENT_LIMIT = 4;

const papers = readFileSync("./paper.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

let accesible = 0;

for (let i = 0; i < papers.length; i++) {
  for (let j = 0; j < papers[i].length; j++) {
    if (papers[i][j] !== "@") {
      continue;
    }

    let adjacent = 0;

    DIRECTIONS.forEach(([x, y]) => {
      if (papers[i + x] && papers[i + x][j + y] === "@") {
        adjacent++;
      }
    });

    if (adjacent < ADJACENT_LIMIT) {
      accesible += 1;
    }
  }
}

console.log("Accesible rolls of paper: " + accesible);
