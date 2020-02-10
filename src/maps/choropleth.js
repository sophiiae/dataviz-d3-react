import {
  geoPath,
  zoom,
  event,
  geoNaturalEarth1
} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const choropleth = (selection, props) => {
  const {
    features,
    colorValue,
    colorScale,
    selectedColorValue
  } = props;

  const gUpdate = selection.selectAll('g').data([null]);
  const gEnter = gUpdate.enter().append('g');
  const g = gUpdate.merge(gEnter); 

  // use d3 geo-projection 
  gEnter.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({ type: 'Sphere' }))
    .merge(gUpdate.select('.sphere'))
    .attr('opacity', selectedColorValue ? 0.1 : 1);

  // zoom in map
  selection.call(zoom().on('zoom', () => {
    g.attr('transform', event.transform);
  }));

  // draw path
  const countryPaths = g.selectAll('.country').data(features);
  const countryPathsEnter = countryPaths.enter()
    .append('path')
    .attr('class', 'country');

  countryPaths.merge(countryPathsEnter)
    .attr('d', pathGenerator)
    .attr('fill', d => colorScale(colorValue(d)))
    .attr('opacity', d => d = selectedColorValue && colorValue(d) !== selectedColorValue ? 0.2 : 1 )
    .classed('highlighted', d => selectedColorValue && colorValue(d) === selectedColorValue)

  // add tooltip text
  countryPathsEnter.append('title')
    .text(d => d.properties.name + ': ' + colorValue(d));
}