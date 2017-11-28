import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProcessEntry } from './process-entry'

@Injectable()
export class ProcessDatabase {
  dataChange: BehaviorSubject<ProcessEntry[]> = new BehaviorSubject<ProcessEntry[]>([]);
  get data(): ProcessEntry[] { return this.dataChange.value; }

  constructor() { }

  signalChange() {
    this.dataChange.next(this.data.slice());
  }

  addProcess() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewProcess());
    this.dataChange.next(copiedData);
  }

  removeProcess(process: ProcessEntry) {
    const copiedData = this.data.slice();
    const index: number = copiedData.indexOf(process);
    if (index !== -1) {
        copiedData.splice(index, 1);
    }
    this.dataChange.next(copiedData);
  }

  removeSelectedProcesses() {
    for (let process of this.data.slice()) {
      if (process.selected) this.removeProcess(process);
    }
  }

  private createNewProcess() {
    let position = this.data.slice().length;
    return {
      selected: false,
      position: position,
      process: "P" + position,
      burstTime: 1,
      arrivalTime: 1,
      turnaroundTime: 0,
      waitingTime: 0,
      timeStarts: [],
      timeEnds: []
    };
  }
}

