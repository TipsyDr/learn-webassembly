interface Options {
  concurrency: number;
}

export class PromiseQueue {
  concurrency: number;
  currentCount: number;
  pendingList: any[];

  constructor(options: Options) {
    this.concurrency = options?.concurrency || 1;
    this.currentCount = 0;
    this.pendingList = [];
  }

  isDone(): boolean {
    return this.pendingList.length <= 0;
  }

  add(task: any) {
    this.pendingList.push(task);
    this.run();
    return new Promise((resolve, reject) => {

    })
  }

  run() {
    if (this.pendingList.length === 0 || this.concurrency === this.currentCount)
      return;
    this.currentCount++;
    const { fn } = this.pendingList
      .sort((a, b) => b.priority - a.priority)
      .shift();
    const promise = fn();
    promise
      .then(this.completeOne.bind(this))
      .catch(this.completeOne.bind(this));
  }

  completeOne() {
    this.currentCount--;
    this.run();
  }
}
