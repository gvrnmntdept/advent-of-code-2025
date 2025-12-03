import { readFileSync } from "node:fs";

function parseJoltage(raw) {
  return raw.split("").map((x) => Number.parseInt(x));
}

const banks = readFileSync("./joltage.txt", "utf8")
  .split("\n")
  .map(parseJoltage);

let joltage = 0;

for (const bank of banks) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < bank.length; i++) {
    const battery = bank[i];

    if (i !== bank.length - 1 && battery > x) {
      x = battery;
      y = 0;
    } else if (battery > y) {
      y = battery;
    }
  }

  joltage += x * 10 + y;
}

console.log("Joltage: " + joltage);
