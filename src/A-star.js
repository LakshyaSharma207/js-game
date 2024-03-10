import { boundaries } from "../main";
import { GridNode } from "./node";
import { Vector2 } from "./vector2";

export class Astar {
  constructor() {
    this.OPEN = [];
    this.CLOSED = [];

    this.START;
    this.GOAL;
    this.gridSize = 16;
    this.closedSet = new Set();
  }

  findPath(start, goal) {
    // start and goal nodes
    this.START = new GridNode(start, goal);
    this.GOAL = new GridNode(goal, goal);

    this.OPEN = [this.START];
    this.CLOSED = [];
    this.closedSet = new Set();

    // Start and goal are the same tile
    if (this.START.tx === this.GOAL.tx && this.START.ty === this.GOAL.ty) {
      // console.log('great');
      return this.GOAL;
    }

    // main function
    while (this.OPEN.length > 0) {
      // Get best node n from OPEN list
      let n = this.getLowestFromOpen();
      
      this.CLOSED.push(n);
      this.closedSet.add(`${n.tx}_${n.ty}`);

      // n is the goal, we are done
      if (n.tx === this.GOAL.tx && n.ty === this.GOAL.ty) {
        this.GOAL = n;
        break;
      }

      // Examine neighbors of n
      let children = this.getNeighbors(n);

      for (let i = 0; i < children.length; i++) {
        let child = children[i];

        // skips node already travelled without breaking loop
        // if (this.getNodeIdxInList(this.CLOSED, child) >= 0) {
        //   continue;
        // }
        const key = `${child.tx}_${child.ty}`;
        if (this.closedSet.has(key)) continue;

        child.g = n.g + 1;
        child.h = n.calcHeuristic(child, this.GOAL);
        child.f = child.g + child.h;

        let result = this.OPEN.find(
          (obj) => obj.tx === child.tx && obj.ty === child.ty,
        );
        if (result) {
          continue;
        }

        this.OPEN.push(child);
      }
    }

    let path = [];
    let current = this.GOAL;

    while (current) {
      path.unshift(current);
      current = current.parent;
    }

    path.splice(0, 1);
    return path[0];
  }

  getLowestFromOpen() {
    let idx = 0;
    let lowest = this.OPEN[idx];

    for (let i = 0; i < this.OPEN.length; i += 1) {
      if (this.OPEN[i].f <= lowest.f) {
        idx = i;
        lowest = this.OPEN[i];
      }
    }

    this.OPEN.splice(idx, 1);
    return lowest;
  }

  getNeighbors(node) {
    let neighbors = [];
    let directions = [
      { dx: -this.gridSize, dy: 0, direction: 'left' }, // Left
      { dx: this.gridSize, dy: 0, direction: 'right' },  // Right
      { dx: 0, dy: -this.gridSize, direction: 'up' }, // Up
      { dx: 0, dy: this.gridSize, direction: 'down' },  // Down
    ];

    for (let dir of directions) {
      let tx = node.tx + dir.dx;
      let ty = node.ty + dir.dy;

      if (this.checkWalkable(tx, ty)) {
        neighbors.push(new GridNode(new Vector2(tx, ty), this.GOAL, node, dir.direction));
      }
    }

    return neighbors;
  }

  // refactor and check specific directions for smoother gameplay loop
  checkWalkable(tx, ty) {
    return (
      tx >= 0 &&
      ty >= 0 &&
      !boundaries.some((b) => b.position.x === tx && b.position.y === ty)
    );
  }

  getNodeIdxInList(arr, node) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].tx == node.tx && arr[i].ty == node.ty) {
        return i;
      }
    }
    return -1;
  }
}