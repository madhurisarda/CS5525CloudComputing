import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ViewEncapsulation } from '@angular/core';

import { Data } from '../models/data.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less'
]
})
export class BarChartComponent implements OnInit {

  @ViewChild('barChart')
  stateData: any;
  @Input()
  data:Data[];

  margin = { top: 100, right: 20, bottom: 30, left: 40 };

  constructor(private chartContainer: ElementRef) { }

  ngOnInit() {
    let i=1;
       if (!this.data) { return; }
    this.createChart();
  }
  private createChart(): void {

    const data = this.data;
    console.log(data);
    const element = this.chartContainer.nativeElement;

    d3.select(element).select('svg').remove();

    const svg = d3.select(element).append('svg')
      .attr('width', 410)
      .attr('height', 320);
    const contentWidth = 380;
    const contentHeight = 160;
    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.2)
      .domain(data.map(d => d.State));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, 100]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

   g.append("g")
         .attr("transform", "translate(0," + contentHeight + ")")
         .call(d3.axisBottom(x));

        g.append("g")
         .call(d3.axisLeft(y).ticks(10))
         .append("text")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("value");
         if(data[0]["Measure Title"]){
         let mtitle= data[0]["Measure Title"];
         let stitle= mtitle.split(":");
         if(!stitle[1]){
           stitle[1]=stitle[0];
         }
         console.log(stitle[1])
g.append('text')
.attr('class', 'heading')
    .attr('x', 160 )
    .attr('y', -70)
    .attr('text-anchor', 'middle')
  /*change here for the css of title of each bar chart*/
    .text(stitle[1])
         }
    g.append('text')
    .attr('x', -(contentHeight / 2))
    .attr('y', -25)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Measure Performance Rate')

    if(data[0]["State"].length >2){
           g.append('text')
.attr('class', 'texts')
    .attr('x', 170 )
    .attr('y', 200)
    .attr('text-anchor', 'middle')
    .text('Hospitals')
    }else{
     g.append('text')
.attr('class', 'texts')
    .attr('x', 170 )
    .attr('y', 190)
    .attr('text-anchor', 'middle')
    .text('States')
    }
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.State))
      .attr('y', d => y(d.MeasurePerformanceRate))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.MeasurePerformanceRate));
  }
onResize() {
    this.createChart();
  }

}
