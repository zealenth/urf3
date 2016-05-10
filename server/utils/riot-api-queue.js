'use strict';

//yes it's just an array for now - but it'll do fancier stuff
//and i want to write the interface for fancier multi-node queuesf
class RiotApiQueue {
  constructor() {
    this.queue = [];
  }

  push(item) {
    this.queue.push(item);
  }

  pop() {
    return this.queue.pop();
  }
}

module.exports.RiotApiQueue = RiotApiQueue;
