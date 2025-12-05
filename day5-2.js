import { createReadStream } from "fs";
import { createInterface } from "readline";

const fileStream = createReadStream("./ingredients.txt");

const rl = createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const freshRanges = [];

for await (const line of rl) {
  if (!line) {
    break;
  }

  const splitted = line.split("-");
  const start = Number.parseInt(splitted[0]);
  const end = Number.parseInt(splitted[1]);
  freshRanges.push([start, end]);
}

freshRanges.sort((first, second) => first[0] - second[0]);

let freshCount = 0;
let endMax = 0;

for (let i = 0; i < freshRanges.length; i++) {
  const [start, end] = freshRanges[i];

  if (end >= endMax) {
    if (start > endMax) {
      freshCount += end - start + 1;
    } else {
      freshCount += end - endMax;
    }
  }

  endMax = Math.max(endMax, end);
}

console.log("Fresh: " + freshCount);
