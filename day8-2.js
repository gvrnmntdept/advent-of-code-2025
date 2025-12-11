import { readFileSync } from "node:fs";

class Node {
  constructor(id, position) {
    this.id = id;
    this.position = position;
    this.owner = null;
  }
}

class Circuit {
  constructor() {
    this.nodes = [];
  }

  connect(node) {
    this.nodes.push(node);
    node.owner = this;
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
}

function canMergeCircuits(first, second) {
  return first !== second;
}

function mergeCircuits(first, second) {
  const circuit = new Circuit();
  const nodes = [...first.nodes, ...second.nodes];
  circuit.nodes = nodes;

  for (const node of nodes) {
    node.owner = circuit;
  }

  return circuit;
}

function calcDistance(source, target) {
  const [x1, y1, z1] = source.position;
  const [x2, y2, z2] = target.position;
  const distance =
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2);
  return distance;
}

const nodes = readFileSync("./junction.txt", "utf8")
  .split("\n")
  .map((x, i) => {
    const circuit = new Circuit();
    const node = new Node(i, x.split(","));
    circuit.connect(node);
    return node;
  });

const pairs = [];

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    pairs.push(new NodePair(nodes[i], nodes[j]));
  }
}

pairs.sort((a, b) => b.distance - a.distance);

let circuits = nodes.length;
let lastPair = undefined;

while (circuits > 1) {
  lastPair = pairs.pop();
  const { first, second } = lastPair;
  if (canMergeCircuits(first.owner, second.owner)) {
    mergeCircuits(first.owner, second.owner);
    circuits--;
  }
}

console.log(
  "Circuit: " + lastPair.first.position[0] * lastPair.second.position[0]
);
