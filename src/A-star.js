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
    }

    findPath(start, goal) {
        
        // start and goal nodes
        this.START = new GridNode(start, goal);
        this.GOAL = new GridNode(goal, goal);

        this.OPEN = [this.START];
        this.CLOSED = []; 

        // Start and goal are the same tile
        if (this.START.tx === this.GOAL.tx && this.START.ty === this.GOAL.ty) {
            console.log('great');
            return this.GOAL;
        }

        // main function
        while(this.OPEN.length > 0) {		
            // Get best node n from OPEN
            let n = this.getLowestFromOpen();
            
            this.CLOSED.push(n);
            
            // n is the goal, we are done
            if(n.tx === this.GOAL.tx && n.ty === this.GOAL.ty)
            {
                this.GOAL = n;
                break;
            }

            // Examine neighbors of n
            let children = this.getNeighbors(n);

            for(let i = 0; i < children.length; i++)
            {
                let child = children[i];
                
                // skips node already travelled without breaking loop
                if(this.getNodeIdxInList(this.CLOSED, child) >= 0)
                {
                    continue; 
                }
                
                child.g	= n.g + 1;
                child.h	= n.calcHeuristic(child, this.GOAL);
                child.f	= child.g + child.h;
                
                let result = this.OPEN.find(obj => obj.tx === child.tx && obj.ty === child.ty);
                if(result)
                {
                    continue;
                }

                this.OPEN.push(child);
            }
        }
        
        let path = [];
        let current = this.GOAL;

        while(current) {
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

        // Left neighbor
        if(node.tx - this.gridSize >= 0 && this.checkWalkable(node, 'left'))
        {
            let pos = new Vector2(node.tx - 1, node.ty);
            neighbors.push(new GridNode(pos, this.GOAL, node, 'left'));
        }
        
        // Right neighbor
        if(this.checkWalkable(node, 'right'))
        {
            let pos = new Vector2(node.tx + 1, node.ty);
            neighbors.push(new GridNode(pos, this.GOAL, node, 'right'));
        }
        
        // Up neighbor
        if(node.ty - this.gridSize >= 0 && this.checkWalkable(node, 'up'))
        {
            let pos = new Vector2(node.tx, node.ty - 1);
            neighbors.push(new GridNode(pos, this.GOAL, node, 'up'));
        }
        
        // Down neighbor
        if(this.checkWalkable(node, 'down'))
        {
            let pos = new Vector2(node.tx, node.ty + 1);
            neighbors.push(new GridNode(pos, this.GOAL, node, 'down'));
        }

        return neighbors;
    }

    // refactor and check specific directions for smoother gameplay loop
    checkWalkable(n, dir) {
        let direction = dir || '';
        let isSpaceFree = true;

        switch(direction.toLowerCase()) {
            
            case "left":
                isSpaceFree = this.checkBound(new Vector2(n.tx - this.gridSize, n.ty));
                break;

            case "right":
                isSpaceFree = this.checkBound(new Vector2(n.tx + this.gridSize, n.ty));
                break;

            case "up":
                isSpaceFree = this.checkBound(new Vector2(n.tx, n.ty - this.gridSize));
                break;

            case "down":
                isSpaceFree = this.checkBound(new Vector2(n.tx, n.ty + this.gridSize));
                break;

            default:
                break;
        }
        return isSpaceFree;
    }

    checkBound(pos) {
        let isSpaceFree = !boundaries.some(b =>{
            if(b.position.x === pos.x && b.position.y === pos.y){
                // console.log('okkk');
                return true; 
            }});
        return isSpaceFree;
    }

    getNodeIdxInList(arr, node) {

        for(let i = 0; i < arr.length; i++)
        {
            if(arr[i].tx == node.tx && arr[i].ty == node.ty)
            {
                return i;
            }
        }
        return -1;
    }
}
