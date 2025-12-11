import { readFileSync } from "node:fs";

const ATTEMPTS = 1000;

class Node {
  constructor(id, position) {
    this.id = id;
    this.position = position;
    this.connected = [];
    this.visited = false;
  }
}

class NodePair {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  get distance() {
    return calcDistance(this.first, this.second);
  }

  connect() {
    const first = this.first;
    const second = this.second;
    first.connected.push(second);
    second.connected.push(first);
  }
}

function calcDistance(source, target) {
  const [x1, y1, z1] = source.position;
  const [x2, y2, z2] = target.position;
  const distance =
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2);
  return distance;
}

function walkCircuit(root, onVisit) {
  if (root.visited) {
    return;
  }

  root.visited = true;
  onVisit(root);

  for (const node of root.connected) {
    walkCircuit(node, onVisit);
  }
}

const nodes = readFileSync("./junction.txt", "utf8")
  .split("\n")
  .map((x, i) => new Node(i, x.split(",")));

const pairs = [];

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    pairs.push(new NodePair(nodes[i], nodes[j]));
  }
}

pairs.sort((a, b) => a.distance - b.distance).splice(ATTEMPTS);

for (const pair of pairs) {
  pair.connect();
}

const circuitSizes = [];

for (const node of nodes) {
  if (node.visited) {
    continue;
  }

  let circuitSize = 0;

  walkCircuit(node, () => {
    circuitSize++;
  });

  circuitSizes.push(circuitSize);
}

circuitSizes.sort((a, b) => b - a);

console.log("Circuit: " + circuitSizes[0] * circuitSizes[1] * circuitSizes[2]);
