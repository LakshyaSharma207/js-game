export class GridNode {
    constructor(pos, goal, parent = null, direction = '') {
        this.tx = pos.x;
        this.ty = pos.y;
        this.parent = parent;
        this.direction = direction;
        
        // g(n) The exact cost of the path from the starting point to any vertex n
        this.g = this.parent ? this.parent.g + 1 : 0;
        
        // h(n) The heuristic estimated cost from vertex n to the goal
        this.h = this.calcHeuristic(pos, goal);
        
        // f(n) = g(n) + h(n)
        this.f = this.g + this.h;
    }

    // manhatten distance method
    calcHeuristic(pos, goal) {
        const movementcost = 1;
        let dx = Math.abs(goal.tx - pos.tx);
        let dy = Math.abs(goal.ty - pos.ty);
        return movementcost * (dx + dy);
    }
}
