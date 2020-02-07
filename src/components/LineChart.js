import React, { useEffect } from 'react'
import '../App.css'
import { 
  csv, 
  select,
  scaleLinear,
  extent,
  axisBottom,
  axisLeft,
  scaleTime,
  line,
  curveBasis
} from 'd3'

const LineChart = () => {
  useEffect(() => createLineChart())

  const render = (data, svg) => {
    const title = 'A Week in San Francisco';
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';
    
    const yValue = d => d.temperature;
    const circleRadius = 6;
    const yAxisLabel = 'Temperature';

    const margin = {
      top: 80,
      right: 40,
      bottom: 90,
      left: 150
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Use linear scale for data 
    // d3.extent returns min and max value in the array
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);
    
    // defin line generator
    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);
    
    // draw lines
    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(data));

    // add chart title
    g.append('text')
      .text(title)
      .attr('class', 'title')
      .attr('y', -20);

    // draw x-aixs
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const xAxisG = g.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${ innerHeight })`);

    // remove domian line
    xAxisG.selectAll('.domain').remove();

    // add axis title
    xAxisG.append('text')
      .text(xAxisLabel)
      .attr('fill', 'black')
      .attr('class', 'axis-label')
      .attr('y', 70)
      .attr('x', innerWidth / 2)

    // draw y-aixs
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15);

    const yAxisG = g.append('g').call(yAxis);

    // remove domian line
    yAxisG.selectAll('.domain').remove();

    // add axis title
    yAxisG.append('text')
      .text(yAxisLabel)
      .attr('class', 'axis-label')
      .attr('fill', 'black')
      .attr('transform', 'rotate(-90)')
      .attr('y', -70)
      .attr('x', -innerHeight / 2);
  }

  const createLineChart = () => {
    const svg = select('svg');

    csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then(data => {
      data.forEach(d => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
      })
      render(data, svg);
    })
  }

  return (
    <svg width="960" height="500">
    </svg>
  )
}

export default LineChart;
