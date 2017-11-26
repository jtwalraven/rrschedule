import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProcessDatabase } from './process-database.service'
import { ProcessEntry } from './process-entry'
import { ProcessCalculationEntry } from './process-calculation-entry'

import * as Collections from 'typescript-collections';

@Injectable()
export class RoundRobinCalcService {

  private timeQuantumSource = new BehaviorSubject<number>(1);
  currentTimeQuantum = this.timeQuantumSource.asObservable();

  private processDatabase = new ProcessDatabase();

  constructor(database: ProcessDatabase) {
    this.processDatabase = database;
  }

  changeTimeQuantum(timeQuantum: number) {
    this.timeQuantumSource.next(timeQuantum);
  }

  calculateRoundRobin() {
    const timeQuantum = this.timeQuantumSource.value;
    let processEntries = this.processDatabase.data.slice();

    let processQueue = new Collections.Queue<ProcessCalculationEntry>();
    let time: number = 0;
    let greatestArrivalTime: number = this.calculateGreatestArrivalTime();

    console.log("Greatest arrival time = " + greatestArrivalTime);
    while(processQueue.size() > 0 || time <= greatestArrivalTime) {
      for (let process of processEntries) {
        if (process.arrivalTime == time) {
          let processCalcEntry: ProcessCalculationEntry = new ProcessCalculationEntry(process, process.burstTime);
          processCalcEntry.processEntry = process;
          processCalcEntry.timeLeft = process.burstTime;
          processQueue.enqueue(processCalcEntry);
        }
      }
      if (processQueue.size() > 0) {
        let currentProcess = processQueue.dequeue();
        if (currentProcess.timeLeft - timeQuantum > 0) {
          currentProcess.timeLeft -= timeQuantum;
          processQueue.enqueue(currentProcess);
        } else {
          let processEntry = currentProcess.processEntry;
          processEntry.waitingTime = this.calculateWaitingTime(time, processEntry.arrivalTime);
          processEntry.turnaroundTime = this.calculateTurnaroundTime(processEntry.waitingTime, currentProcess.timeLeft);
        }
      }
      time++;
    }
  }

  private calculateGreatestArrivalTime(): number {
    let greatestArrivalTime: number = 0;
    let processEntries = this.processDatabase.data.slice();
    for (let process of processEntries) {
      if (process.arrivalTime > greatestArrivalTime) {
        greatestArrivalTime = process.arrivalTime;
      }
    }
    return greatestArrivalTime;
  }

  private calculateWaitingTime(finalStartTime: number, arrivalTime: number): number {
    return finalStartTime - arrivalTime;
  }

  private calculateTurnaroundTime(waitingTime: number, timeLeft: number): number {
    return waitingTime + timeLeft;
  }
}

