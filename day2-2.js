import { readFileSync } from "node:fs";

function parseRange(raw) {
  const splitted = raw.split("-");
  const start = Number.parseInt(splitted[0]);
  const end = Number.parseInt(splitted[1]);
  return [start, end];
}

function isValid(id) {
  const str = id.toString();

  for (let i = 1; i < str.length; i++) {
    if (str.length % i !== 0) {
      continue;
    }
    const sub = str.substring(0, i);
    if (str === sub.repeat(str.length / i)) {
      return false;
    }
  }

  return true;
}

const ranges = readFileSync("./product-ids.txt", "utf8")
  .toString()
  .split(",")
  .map(parseRange);

let sum = 0;

for (const range of ranges) {
  const [start, end] = range;

  for (let id = start; id <= end; id++) {
    if (!isValid(id)) {
      sum += id;
    }
  }
}

console.log("ID Sum: " + sum);
