class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element.priority >= parent.priority) break;
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const element = this.heap[index];
    while (true) {
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < this.heap.length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < this.heap.length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function prim(graph, start) {
  // Initialize the visited set, the minimum heap, and the minimum spanning tree
  const visited = new Set();
  const heap = new PriorityQueue();
  const mst = [];

  // Add the starting node to the visited set and the minimum heap
  visited.add(start);
  for (const neighbor of graph[start]) {
    heap.enqueue(
      { from: start, to: neighbor.to, weight: neighbor.weight },
      neighbor.weight
    );
  }

  // Loop until the minimum heap is empty
  while (!heap.isEmpty()) {
    // Pop the smallest edge from the minimum heap
    const { value: edge, priority: weight } = heap.dequeue();
    const { from, to } = edge;

    // If the destination node is not visited, add it to the visited set
    if (!visited.has(to)) {
      visited.add(to);
      // Add the edge to the minimum spanning tree
      mst.push(edge);
      // Add the neighbors of the destination node to the minimum heap
      for (const neighbor of graph[to]) {
        if (!visited.has(neighbor.to)) {
          heap.enqueue(
            { from: to, to: neighbor.to, weight: neighbor.weight },
            neighbor.weight
          );
        }
      }
    }
  }

  return mst;
}

// const input = [
//   [0, 2, 0, 6, 0],
//   [2, 0, 3, 8, 5],
//   [0, 3, 0, 0, 7],
//   [6, 8, 0, 0, 9],
//   [0, 5, 7, 9, 0],
// ];


// const graph = {
//   A: [
//     { to: "B", weight: 2 },
//     { to: "C", weight: 3 },
//   ],
//   B: [
//     { to: "A", weight: 2 },
//     { to: "C", weight: 4 },
//     { to: "D", weight: 1 },
//   ],
//   C: [
//     { to: "A", weight: 3 },
//     { to: "B", weight: 4 },
//     { to: "D", weight: 5 },
//   ],
//   D: [
//     { to: "B", weight: 1 },
//     { to: "C", weight: 5 },
//   ],
// };
// const start = "A";
// const start = 0;

// console.log(prim(graph, start));
