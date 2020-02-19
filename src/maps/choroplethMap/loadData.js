import { feature } from 'topojson'
import { tsv, json } from 'd3'

export const loadData = () => 
  Promise.all([
    tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  ]).then(([ tsvData, topoJSONData ]) => {
    const rowById = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = d;
      return acc;
    }, {});

    const countries = feature(topoJSONData, topoJSONData.objects.countries);

    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[d.id]);
    })

    return countries;
  })
