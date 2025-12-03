import { readFileSync } from "node:fs";

function parseJoltage(raw) {
  return raw.split("").map((x) => Number.parseInt(x));
}

const banks = readFileSync("./joltage.txt", "utf8")
  .split("\n")
  .map(parseJoltage);

let joltage = 0;

for (const bank of banks) {
  const value = new Array(12).fill(0);

  for (let i = 0; i < bank.length; i++) {
    const battery = bank[i];

    for (let j = 0; j < value.length; j++) {
      if (bank.length - i >= value.length - j) {
        if (battery > value[j]) {
          value[j] = battery;

          for (let k = j + 1; k < value.length; k++) {
            value[k] = 0;
          }

          break;
        }
      }
    }
  }

  joltage += Number.parseInt(value.join(""));
}

console.log("Joltage: " + joltage);
