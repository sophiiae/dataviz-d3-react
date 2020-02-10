import React, { useEffect } from 'react'
import { 
  select,
  scaleOrdinal,
  schemeSpectral
} from 'd3'
import { loadData } from './loadData'
import { colorLegend } from './colorLengend'
import { choropleth } from './choropleth'

const ChoroplethMap = () => {
  useEffect(() => createChoroplethMap())

  const createChoroplethMap = () => {
    const svg = select('svg');
    const choroplethMap = svg.append('g');
    const colorLengendG = svg.append('g')
      .attr('transform', `translate(30,354)`);

    const colorScale = scaleOrdinal();
    const colorValue = d => d.properties.economy;

    let selectedColorValue; 
    let features;

    const onClick = d => {
      selectedColorValue = d;
      render();
    }; 

    loadData().then(countries => {
      features = countries.features;
      render();
    });
    
    const render = () => {
      colorScale.domain(features.map(colorValue))
        .domain(colorScale.domain().sort())
        .range(schemeSpectral[colorScale.domain().length ]);

      // call colorLegend within colorLegendG selection
      colorLengendG.call(colorLegend, {
        colorScale,
        circleRadius: 7,
        spacing: 20,
        textOffset: 20,
        backgroundRectWidth: 216,
        onClick,
        selectedColorValue
      });

      choroplethMap.call(choropleth, {
        features,
        colorValue,
        colorScale,
        selectedColorValue
      })
    }

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

export default ChoroplethMap;
