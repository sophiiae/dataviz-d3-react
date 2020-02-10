import React, { useEffect } from 'react'
import { select, json, geoPath, geoNaturalEarth1 } from 'd3'
import { feature } from 'topojson'
import '../App.css'

const WorldMap = () => {
  useEffect(() => createWorldMap())

  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const createWorldMap = () => {
    const svg = select('svg');

    svg.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere'}));

    json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
      .then(data => {
        const countries = feature(data, data.objects.countries);

        svg.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator)
          .append('title')
          .text('hello')
          .style('font-size', 18)
          .style('color', 'red')
      });

    svg.style('margin-left', 100)
      .style('margin-top', 50);
  }

  return (
    <div>
      <svg width="1100" height="500"></svg>
    </div>
  )
}

export default WorldMap;
