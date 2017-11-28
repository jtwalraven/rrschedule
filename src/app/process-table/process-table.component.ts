import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ProcessDatabase } from '../process-database.service'
import { RoundRobinCalcService } from '../roundrobin-calc.service'
import { ProcessEntry } from '../process-entry'
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {
  displayedColumns = ['selected', 'position', 'process', 'burstTime', 'arrivalTime', 'turnaroundTime', 'waitingTime'];
  private processDatabase = new ProcessDatabase();
  private calcluationService: RoundRobinCalcService;
  private dataSource: ProcessTableDataSource | null;

  constructor(database: ProcessDatabase, calcService: RoundRobinCalcService) {
    this.processDatabase = database;
    this.calcluationService = calcService;
  }

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

  calculateUpdates() {
    this.processDatabase.signalChange();
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
