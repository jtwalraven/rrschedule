export interface ProcessEntry {
  selected: boolean;
  position: number;
  process: string;
  burstTime: number;
  arrivalTime: number;
  turnaroundTime: number;
  waitingTime: number;
  timeStarts: number[];
  timeEnds: number[];
}
