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

  private averageWaitingTimeSource = new BehaviorSubject<number>(1);
  currentAverageWaitingTime = this.averageWaitingTimeSource.asObservable();

  private averageTurnaroundTimeSource = new BehaviorSubject<number>(1);
  currentAverageTurnaroundTime = this.averageTurnaroundTimeSource.asObservable();

  private processDatabase = new ProcessDatabase();

  constructor(database: ProcessDatabase) {
    this.processDatabase = database;
    this.processDatabase.dataChange.asObservable().subscribe(data => this.calculateRoundRobinWithProcessEntries(data));
    this.currentTimeQuantum.subscribe(timeQuantum => this.calculateRoundRobinWithTimeQuantum(timeQuantum));
  }

  changeTimeQuantum(timeQuantum: number) {
    if (timeQuantum > 0 && timeQuantum < 1000) {
      this.timeQuantumSource.next(timeQuantum);
    }
  }

  calculateRoundRobinWithTimeQuantum(timeQuantum: number) {
    let processEntries = this.processDatabase.data.slice();
    this.calculateRoundRobin(timeQuantum, processEntries);
  }

  calculateRoundRobinWithProcessEntries(processEntries: ProcessEntry[]) {
    let timeQuantum = this.timeQuantumSource.value;
    this.calculateRoundRobin(timeQuantum, processEntries);
  }

  calculateRoundRobin(timeQuantum: number, processEntries: ProcessEntry[]) {
    let processQueue = new Collections.Queue<ProcessCalculationEntry>();
    let time: number = 0;
    let greatestArrivalTime: number = this.calculateGreatestArrivalTime();
    let totalWaitingTime: number = 0;
    let totalTurnaroundTime: number = 0;

    while(processQueue.size() > 0 || time <= greatestArrivalTime) {
      for (let process of processEntries) {
        if (process.arrivalTime == time) {
          let processCalcEntry: ProcessCalculationEntry = new ProcessCalculationEntry(process, process.burstTime);
          processCalcEntry.processEntry = process;
          processCalcEntry.timeLeft = process.burstTime;
          processQueue.enqueue(processCalcEntry);

          // Clear the time starts and ends arrays
          processCalcEntry.processEntry.timeStarts = [];
          processCalcEntry.processEntry.timeEnds = [];
        }
      }
      if (processQueue.size() > 0) {
        let currentProcess = processQueue.dequeue();
        currentProcess.processEntry.timeStarts.push(time);
        if (currentProcess.timeLeft - timeQuantum > 0) {
          currentProcess.timeLeft -= timeQuantum;
          processQueue.enqueue(currentProcess);
          currentProcess.processEntry.timeEnds.push(time + timeQuantum);
        } else {
          let processEntry = currentProcess.processEntry;
          processEntry.waitingTime = this.calculateWaitingTime(time, processEntry.arrivalTime);
          processEntry.turnaroundTime = this.calculateTurnaroundTime(processEntry.waitingTime, currentProcess.timeLeft);
          totalWaitingTime += processEntry.waitingTime;
          totalTurnaroundTime += processEntry.turnaroundTime;
          processEntry.timeEnds.push(time + currentProcess.timeLeft);
        }
      }
      time++;
    }

    this.averageWaitingTimeSource.next(totalWaitingTime / processEntries.length);
    this.averageTurnaroundTimeSource.next(totalTurnaroundTime / processEntries.length);
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

