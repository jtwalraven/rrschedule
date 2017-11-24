import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let svg: Selection<any, any, any, any>;

    let name: string;
    let yVal: number;
    let colors: any = [];
    let data: {name: string, yVal: number}[] = [];
    let padding: number = 25;
    let width: number = 500;
    let height: number = 150;
    let xScale: any;
    let yScale: any;
    let xColor: any;
    let xAxis: any;
    let yAxis: any;

    if (this.parentNativeElement !== null) {

      svg = d3.select('#chart')
        .append('svg').attr('width', '100%').attr('height', 500);

      colors = ['red', 'yellow', 'green', 'blue'];

      data = [
          {xVal : 1, yVal : 1},
          {xVal : 2, yVal : 4},
          {xVal : 3, yVal : 2},
          {xVal : 4, yVal : 3}
      ];

      xScale = d3.scaleLinear()
          .domain(data.map(function(d){ return d.xVal; }))
          .range([0, 200]);

      yScale = d3.scaleBand()
          .domain([0,d3.max(data, function(d) {return d.yVal})])
          .range([100, 0]);

      xAxis = d3.axisBottom(xScale)
          .ticks(5)
          .scale(xScale);

      yAxis = d3.axisLeft(xScale)
          .scale(yScale)
          .ticks(7);

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + "," + padding + ")")
        .call(yAxis);

	       svg.append('g')            // create a <g> element
         .attr('class', 'axis')   // specify classes
	       .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
         .call(xAxis);            // let the axis do its thing

      var rects = svg.selectAll('rect')
          .data(data);
          rects.size();

      var newRects = rects.enter();

      newRects.append('rect')
          .attr('x', function(d,i) {
            return xScale(d.xVal);
          })
          .attr('y', function(d) {
              return yScale(d.yVal);
            })
	        .attr("transform","translate(" + (padding -5  + 25) + "," + (padding - 5) + ")")
          .attr('height', 10)
          .attr('width', function(d) {
              return width - xScale(d.xVal) - (2*padding) + 5})
          .attr('fill', function(d, i) {
            return colors[i];
          });
    }
  }

}
