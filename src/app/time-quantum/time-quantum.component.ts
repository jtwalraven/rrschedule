import { Component, OnInit } from '@angular/core';
import { RoundRobinCalcService } from '../roundrobin-calc.service';

@Component({
  selector: 'app-time-quantum',
  templateUrl: './time-quantum.component.html',
  styleUrls: ['./time-quantum.component.css']
})
export class TimeQuantumComponent implements OnInit {

  timeQuantum: number = 1;

  constructor(private calcService: RoundRobinCalcService) {}

  ngOnInit() {
    this.calcService.currentTimeQuantum.subscribe(tq => this.timeQuantum = tq);
  }

  updateValue() {
    this.calcService.changeTimeQuantum(this.timeQuantum);
  }

}
