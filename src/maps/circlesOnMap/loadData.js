import { feature } from 'topojson'
import { csv, json } from 'd3'
import popData from '../../data/pop-2019-estimates.csv'

export const loadData = () => 
  Promise.all([
    csv(popData),
    json('https://unpkg.com/visionscarto-world-atlas@0.0.6/world/110m.json')
  ]).then(([ popData, topoJSONData ]) => {
    const rowById = popData.reduce((acc, d) => {
      acc[d['Country code']] = d;
      return acc;
    }, {});

    const countries = feature(topoJSONData, topoJSONData.objects.countries);

    console.log(topoJSONData)
    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[+d.id]);
    })

    const featuresWithData = countries.features
      .filter(d => d.properties['2019'])
      .map(d => {
        d.properties['2019'] = +d.properties['2019'].replace(/ /g, '');
        return d; 
      })
    
    // console.log(featuresWithData)
    return {
      features: countries.features,
      featuresWithData
    }
  })
