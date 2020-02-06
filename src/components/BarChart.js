import React, { useEffect } from 'react'
import '../App.css'
import * as d3 from "d3";

const BarChart = () => {
  useEffect(() => createBarChart())

  const createBarChart = () => {
    const data = [12, 5, 6, 6, 9, 10];
    
    const svg = d3.select("svg");
    const height = +svg.attr('height');

    svg.style("margin-left", 100)
      .style("margin-top", 100)
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => height - (10 * d) - 3);
  }

  return <svg width="700" height="300"></svg>
}

export default BarChart
