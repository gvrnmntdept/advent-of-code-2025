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

let removed = 0;
const cellsToProcess = [];

for (let i = 0; i < papers.length; i++) {
  for (let j = 0; j < papers[i].length; j++) {
    cellsToProcess.push([i, j]);
  }
}

while (cellsToProcess.length > 0) {
  const [i, j] = cellsToProcess.pop();

  if (papers[i][j] !== "@") {
    continue;
  }

  const next = [];

  let adjacent = 0;

  DIRECTIONS.forEach(([x, y]) => {
    if (papers[i + x] && papers[i + x][j + y] === "@") {
      adjacent++;
      next.push([i + x, j + y]);
    }
  });

  if (adjacent < ADJACENT_LIMIT) {
    papers[i][j] = "x";
    cellsToProcess.push(...next);
    removed++;
  }
}

console.log("Removed rolls of paper: " + removed);
