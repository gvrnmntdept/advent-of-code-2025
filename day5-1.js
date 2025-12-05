import { createReadStream } from "fs";
import { createInterface } from "readline";

const fileStream = createReadStream("./ingredients.txt");

const rl = createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const freshRanges = [];
const available = [];
let isParsingRanges = true;

for await (const line of rl) {
  if (!line) {
    isParsingRanges = false;
    continue;
  }

  if (isParsingRanges) {
    const splitted = line.split("-");
    const start = Number.parseInt(splitted[0]);
    const end = Number.parseInt(splitted[1]);
    freshRanges.push([start, end]);
  } else {
    const val = Number.parseInt(line);
    available.push(val);
  }
}

let freshCount = 0;

for (const ingridient of available) {
  for (const range of freshRanges) {
    if (ingridient >= range[0] && ingridient <= range[1]) {
      freshCount++;
      break;
    }
  }
}

console.log("Fresh: " + freshCount);
