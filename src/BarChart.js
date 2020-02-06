import React, { useEffect } from 'react'
import './App.css'
import * as d3 from "d3";

const BarChart = (props) => {
  useEffect(() => createBarChart())

  const createBarChart = () => {
    const data = props.data; 
    
    const svg = d3.select("body")
      .append("svg")
      .attr("width", props.width)
      .attr("height", props.height)
      .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => props.height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => props.height - (10 * d) - 3);
  }

  return <div id={props.id}></div>
}

export default BarChart
