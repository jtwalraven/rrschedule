import { ProcessEntry } from './process-entry'

export class ProcessCalculationEntry {
  constructor(processEntry: ProcessEntry, timeLeft: number) {
    this.processEntry = processEntry;
    this.timeLeft = timeLeft;
  }

  processEntry: ProcessEntry;
  timeLeft: number;
}
