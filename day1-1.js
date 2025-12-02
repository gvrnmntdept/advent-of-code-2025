import { readFileSync } from "node:fs";

const rotations = readFileSync("./rotations.txt", "utf8")
  .toString()
  .split("\n");

let position = 50;
let password = 0;

for (const rotation of rotations) {
  const direction = rotation[0];
  const clicks = Number.parseInt(rotation.substring(1));

  if (direction === "R") {
    position = (position + clicks) % 100;
  }

  if (direction === "L") {
    let next = position - (clicks % 100);
    if (next < 0) {
      next += 100;
    }
    position = next;
  }

  if (position === 0) {
    password++;
  }
}

console.log(`Password: ${password}`);
