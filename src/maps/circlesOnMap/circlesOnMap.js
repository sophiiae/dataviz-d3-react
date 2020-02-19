import React, { useEffect } from 'react'
import { 
  select,
  max,
  zoom,
  event,
  geoNaturalEarth1,
  geoPath,
  geoCentroid,
  scaleSqrt,
  format
} from 'd3'
import { loadData } from './loadData'

const CirclesOnMap = () => {
  useEffect(() => createCirclesOnMap())

  const createCirclesOnMap = () => {
    const svg = select('svg');

    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);

    const radiusScale = scaleSqrt();
    const radiusValue = d => d.properties['2019'];

    const map = svg.append('g');
    map.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere' }));

    svg.call(zoom().on('zoom', () => {
      map.attr('transform', event.transform);
    }));

    loadData().then(countries => {
      map.selectAll('path')
        .data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator)
          .attr('fill', d => d.properties['2019'] ? 'green' : 'red')
        .append('title')
          .text(d => d.id)

      radiusScale.domain([0, max(countries.features, radiusValue)])
        .range([0, 20])
      
      countries.featuresWithData.forEach(d => 
        d.properties.projected = projection(geoCentroid(d))
      )

      const circles = map.selectAll('circle')
        .data(countries.featuresWithData)
        .enter().append('circle')
          .attr('class', 'country-circle');

      circles.attr('cx', d => d.properties.projected[0])
        .attr('cy', d => d.properties.projected[1])
        .attr('r', d => radiusScale(radiusValue(d)))
        .attr('fill', 'yellow')
        .attr('opacity', 0.7);
      
      // const text = map.selectAll('text')
      //   .data(countries.featuresWithData)
      //   .enter().append('text');
      
      // text.attr('x', d => d.properties.projected[0] - 10)
      //   .attr('y', d => d.properties.projected[1] + 4)
      //   .text(d => format('.1s')(d.properties['2019']))
      //   .attr('font-size', 12)
      //   .attr('fill', 'black')
    });

    // styling
    svg.style('margin-left', 60)
      .style('margin-top', 50);
  }

  return (
    <div>
      <svg width="1100" height="500"></svg>
    </div>
  )
}

export default CirclesOnMap;
