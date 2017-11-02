import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {
  displayedColumns = ['position', 'process', 'burstTime', 'arrivalTime', 'turnaroundTime', 'waitingTime'];
  processDatabase = new ProcessDatabase();
  dataSource: ProcessTableDataSource | null;

  constructor() { }

  ngOnInit() {
    this.dataSource = new ProcessTableDataSource(this.processDatabase);
  }

}

export interface ProcessEntry {
  position: number;
  process: string;
  burstTime: number;
  arrivalTime: number;
  turnaroundTime: number;
  waitingTime: number;
}

export class ProcessDatabase {
  dataChange: BehaviorSubject<ProcessEntry[]> = new BehaviorSubject<ProcessEntry[]>([]);
  get data(): ProcessEntry[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 10 processes.
    for (let i = 0; i < 10; i++) { this.addProcess(); }
  }

  addProcess() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewProcess());
    this.dataChange.next(copiedData);
  }

  private createNewProcess() {
    return {
      position: 1,
      process: "P1",
      burstTime: 1,
      arrivalTime: 1,
      turnaroundTime: 1,
      waitingTime: 1
    };
  }
}

export class ProcessTableDataSource extends DataSource<any> {
  constructor(private _processDatabase: ProcessDatabase) {
    super();
  }

  connect(): Observable<ProcessEntry[]> {
    const displayDataChanges = [
      this._processDatabase.dataChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._processDatabase.data.slice();
    });
  }

  disconnect() {}

}
