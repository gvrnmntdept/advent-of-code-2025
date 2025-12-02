import { readFileSync } from "node:fs";

function parseRange(raw) {
  const splitted = raw.split("-");
  const start = Number.parseInt(splitted[0]);
  const end = Number.parseInt(splitted[1]);
  return [start, end];
}

function isValid(id) {
  const str = id.toString();
  if (str.length % 2 !== 0) {
    return true;
  }

  const sub = str.substring(0, str.length / 2);

  return str !== sub.repeat(2);
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
