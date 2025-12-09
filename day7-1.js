import { readFileSync } from "node:fs";

const diagram = readFileSync("./tachyon.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

let splitCount = 0;

let current = new Set();
let next = new Set();

for (let i = 0; i < diagram.length; i++) {
  if (i === 0) {
    const start = diagram[0].findIndex((x) => x === "S");
    next.add(start);
    continue;
  }

  current = next;
  next = new Set();

  for (let j = 0; j < diagram[i].length; j++) {
    const cell = diagram[i][j];

    if (current.has(j)) {
      if (cell === ".") {
        next.add(j);
      }
      if (cell === "^") {
        splitCount++;
        next.add(j + 1);
        next.add(j - 1);
      }
    }
  }
}

console.log("Split: " + splitCount);
