import React, { useEffect } from 'react'
import * as d3 from 'd3'
import data from '../data/data.csv'
import { scaleLinear } from 'd3'

const BarChartCSV = () => {
  useEffect(() => createBarChartCSV())

  const render = (data, svg) => {
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const xValue = d => d.population;
    const yValue = d => d.country;

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 100
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth])
    
    

    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.2);

    const g = svg.append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`)
    
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${ innerHeight })`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'steelblue')
    
    g.selectAll('text')
      .attr('font-size', 14)
  }

  const createBarChartCSV = () => {
    const svg = d3.select('svg');
    


    d3.csv(data).then(data => {
      data.forEach(d => d.population = +d.population);
      render(data, svg);
    })
  }

  return (
    <svg width="960" height="500">
      <g></g>
    </svg>
  )
}

export default BarChartCSV;
