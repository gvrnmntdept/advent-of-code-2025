import { readFileSync } from "node:fs";

function addOrCreate(dict, key, val) {
  dict.set(key, (dict.get(key) || 0) + val);
}

const diagram = readFileSync("./tachyon.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

let current = new Map();
let next = new Map();

for (let i = 0; i < diagram.length; i++) {
  if (i === 0) {
    const start = diagram[0].findIndex((x) => x === "S");
    next.set(start, 1);
    continue;
  }

  current = next;
  next = new Map();

  for (let j = 0; j < diagram[i].length; j++) {
    const cell = diagram[i][j];

    if (current.has(j)) {
      if (cell === ".") {
        addOrCreate(next, j, current.get(j));
      }
      if (cell === "^") {
        if (j + 1 < diagram.length) {
          addOrCreate(next, j + 1, current.get(j));
        }
        if (j - 1 >= 0) {
          addOrCreate(next, j - 1, current.get(j));
        }
      }
    }
  }
}

const timelines = [...next.values()].reduce((acc, cur) => acc + cur, 0);

console.log("Timelines: " + timelines);
