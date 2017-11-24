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

  addProcess() {
    this.processDatabase.addProcess();
  }

  removeProcess() {
    this.processDatabase.removeSelectedProcesses();
  }

  selectRow(row) {
    row.selected = !row.selected;
  }

}

export interface ProcessEntry {
  selected: boolean;
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

  constructor() {}

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
