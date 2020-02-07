import React, { useEffect } from 'react'
import * as d3 from 'd3'
import data from '../data/data.csv'

const CustomAxis = () => {
  useEffect(() => createCustomAxis())

  const render = (data, svg) => {
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const xValue = d => d.population;
    const yValue = d => d.country;

    const margin = {
      top: 60,
      right: 20,
      bottom: 60,
      left: 200
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // define scale for data
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth])
    
    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.2);

    // add a group
    const g = svg.append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`)
    
    // draw x-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('.2s'))
      .tickSize(-innerHeight);

    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
        .remove();

    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${ innerHeight })`);

    xAxisG.select('.domain')
        .remove();
    
    xAxisG.append('text')
      .attr('y', 50)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text('Population');

    // add bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'steelblue')
    
    g.selectAll('text')
      .attr('font-size', 16)

    // add chart title
    g.append('text')
      .text('Top 10 Most Populous Countries')
      .attr('y', -10)
      .attr('x', innerWidth / 4)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 28)

    g.selectAll('.tick text')
      .attr('fill', '#635F5D')
  }

  const createCustomAxis = () => {
    const svg = d3.select('svg');

    d3.csv(data).then(data => {
      data.forEach(d => d.population = +d.population);
      render(data, svg);
    })
  }

  return (
    <svg width="960" height="600">
      <g></g>
    </svg>
  )
}

export default CustomAxis;
