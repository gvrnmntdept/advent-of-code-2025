import { readFileSync } from "node:fs";

const math = readFileSync("./math.txt", "utf8").split("\n");

let total = 0;
let operands = [];

for (let i = math[0].length - 1; i >= 0; i--) {
  let buffer = "";
  for (let j = 0; j < math.length - 1; j++) {
    const cell = math[j][i];
    if (cell !== " ") {
      buffer += cell;
    }
  }

  if (buffer) {
    operands.push(Number.parseInt(buffer));
    buffer = "";
  }

  const op = math[math.length - 1][i];

  if (op === "+") {
    total += operands.reduce((acc, cur) => acc + cur, 0);
    operands = [];
  }
  if (op === "*") {
    total += operands.reduce((acc, cur) => acc * cur, 1);
    operands = [];
  }
}

console.log("Total: " + total);
