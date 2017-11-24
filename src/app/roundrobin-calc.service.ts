import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RoundRobinCalcService {

  private timeQuantumSource = new BehaviorSubject<number>(1);
  currentTimeQuantum = this.timeQuantumSource.asObservable();

  constructor() { }

  changeTimeQuantum(timeQuantum: number) {
    this.timeQuantumSource.next(timeQuantum)
  }
}

