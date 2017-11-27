import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { RoundRobinCalcService } from '../roundrobin-calc.service'
import { ProcessDatabase } from '../process-database.service'
import { ProcessEntry } from '../process-entry'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private calcService: RoundRobinCalcService;
  private averageWaitingTime: number;
  private averageTurnaroundTime: number;
  private processDatabase = new ProcessDatabase();

  constructor(element: ElementRef,
    d3Service: D3Service,
    calcService: RoundRobinCalcService,
    database: ProcessDatabase) {

    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.calcService = calcService;
    this.processDatabase = database;
  }

  ngOnInit() {
    this.calcService.currentAverageWaitingTime.subscribe(awt => this.averageWaitingTime = awt);
    this.calcService.currentAverageTurnaroundTime.subscribe(att => this.averageTurnaroundTime = att);

    this.drawChart();
  }

  drawChart() {
    let d3 = this.d3;
    let svg: Selection<any, any, any, any>;

    let yVal: number;
    let colors: any = [];
    let data: {name: string, startTime: number, endTime: number}[] = [];
    let processes: string[] = [];
    let padding: number = 25;
    let width: number = 500;
    let height: number = 150;
    let xScale: any;
    let xColor: any;
    let xAxis: any;
    let yAxis: any;

    if (this.parentNativeElement !== null) {

      // TODO: Subscribe to time quantum update
      this.processDatabase.dataChange.asObservable().subscribe(nwData => {
        data = [];
        processes = [];
        for (let processEntry of nwData) {
          for (let i = 0; i < processEntry.timeStarts.length && i < processEntry.timeEnds.length; i++) {
            data.push({
              name: processEntry.process,
              startTime: processEntry.timeStarts[i],
              endTime: processEntry.timeEnds[i]
            });
            processes.push(processEntry.process);
          }
        }
        console.log(data);
      });

      d3.select("#chart")
        .selectAll("div")
        .data(data)
          .enter()
          .append("div")
          .style("width", function(d) { return (d.endTime - d.startTime) + "px"; })
          .style("margin-left", function(d) { return (d.startTime + 8) + "px"; })
          .text(function(d) { return d.startTime; });
    }
  }

}
