import React, { useEffect } from 'react'
import * as d3 from "d3";

const Shape = () => {
  useEffect(() => createShape())

  const createShape = () => { 
    var lineGenerator = d3.line();
    var radialLineGenerator = d3.radialLine();
    var areaGenerator = d3.area()
      .x(d => d.x)
      .y0(d => yScale(d.low))
      .y1(d => yScale(d.high))
      .curve(d3.curveCardinal)

    var xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]);
    var yScale = d3.scaleLinear().domain([0, 100]).range([200, 0]);

    var points = [
      {x: 0, low: 30, high: 80},
      {x: 100, low: 80, high: 100},
      {x: 200, low: 20, high: 30},
      {x: 300, low: 20, high: 50},
      {x: 400, low: 10, high: 40},
      {x: 500, low: 50, high: 80}
    ];

    var lineGenerator = d3.line()
      .curve(d3.curveCardinal);

    var line = lineGenerator(points);
    var radialLine = radialLineGenerator(points);
    var area = areaGenerator(points);
      
    d3.select('svg')
      .append('path')
      .attr('d', area);
  }

  return (
    <svg width="700" height="200">
      <g></g>
    </svg>
  )
}

export default Shape;