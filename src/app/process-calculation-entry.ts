import { ProcessEntry } from './process-entry'

export class ProcessCalculationEntry {
  constructor(processEntry: ProcessEntry, timeLeft: number);

  processEntry: ProcessEntry;
  timeLeft: number;
}
