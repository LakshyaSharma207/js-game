export default class BinaryHeap {
    constructor() {
        this.heap = [];
        this.heapSet = new Set();
    }

    get length() {
        return this.heap.length;
    }

    get isEmpty() {
        return this.length === 0;
    }
    
    // insert new node and compare with parents
    insert(node) {
        const key = `${node.tx}_${node.ty}`;
        if (this.heapSet.has(key)) {
            return;
        }

        this.heap.push(node);
        this.heapSet.add(key);
        let index = this.length - 1;
        // console.log(index)
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent.f < node.f) { // break when parent is less than child
                break;     
            }

            this.heap[parentIndex] = node;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    // extract minimum node
    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        this.heapSet.delete(`${min.tx}_${min.ty}`);

        if (this.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }

        return min;
    }

    // recalculate min heap tree after root node is extracted
    heapifyDown() {
        let index = 0;
        const length = this.length;
        const current = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap = null;

            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.f < current.f) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.f < current.f) ||
                    (swap !== null && rightChild.f < this.heap[swap].f)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = current;
            index = swap;
        }
    }
}