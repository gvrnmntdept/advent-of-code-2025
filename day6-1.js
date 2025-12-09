import { readFileSync } from "node:fs";

const math = readFileSync("./math.txt", "utf8")
  .split("\n")
  .map((row) =>
    row
      .trim()
      .split(/\s+/)
      .map((cell) => (isNaN(cell) ? cell : Number.parseInt(cell)))
  );

let total = 0;

for (let i = 0; i < math[0].length; i++) {
  let acc = math[0][i];
  for (let j = 1; j < math.length - 1; j++) {
    const op = math[math.length - 1][i];
    if (op === "+") {
      acc += math[j][i];
    }
    if (op === "*") {
      acc *= math[j][i];
    }
  }

  total += acc;
}

console.log("Total: " + total);
