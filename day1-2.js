import { readFileSync } from "node:fs";

const rotations = readFileSync("./rotations.txt", "utf8").split("\n");

let position = 50;
let password = 0;

for (const rotation of rotations) {
  const direction = rotation[0];
  const clicks = Number.parseInt(rotation.substring(1));

  if (direction === "R") {
    password += Math.floor((position + clicks) / 100);
    position = (position + clicks) % 100;
  }

  if (direction === "L") {
    let next = position - (clicks % 100);
    password += Math.floor(clicks / 100);

    if (next < 0) {
      if (position !== 0) {
        password++;
      }

      next += 100;
    }

    if (next === 0 && position !== 0) {
      password++;
    }

    position = next;
  }
}

console.log(`Password: ${password}`);
