import React, { useEffect } from 'react'
import '../App.css'
import * as d3 from 'd3'

const ScatterChart = () => {
  useEffect(() => createScatterChart())

  const render = (data, svg) => {
    const title = 'Cars: Horsepower vs. Weight';
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const xValue = d => d.horsepower;
    const xAxisLabel = 'Horsepower';
    
    const yValue = d => d.weight;
    const circleRadius = 10;
    const yAxisLabel = 'Weight';

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
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
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

    // add chart title
    g.append('text')
      .text(title)
      .attr('class', 'title')
      .attr('y', -20);

    // draw x-aixs
    const xAxis = d3.axisBottom(xScale)
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
      .attr('y', 80)
      .attr('x', innerWidth / 2)

    // draw y-aixs
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(d3.format('.2s'))
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
      .attr('y', -90)
      .attr('x', -innerHeight / 2)
      .attr('text-anchor', 'middle');
  }

  const createScatterChart = () => {
    const svg = d3.select('svg');

    d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then(data => {
      data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year; 
      });
      render(data, svg);
    })
  }

  return (
    <svg width="960" height="500">
    </svg>
  )
};

export default ScatterChart;