d3.json('./sample_geo.json', (err, data) => {
  if(err) throw error;

  let path = d3.geoPath();
  let width = 600;
  let height = 600;

  d3.select('svg')
      .attr('width', width)
      .attr('height', height)
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
      .attr('d', path)
      .attr('fill', d => d.properties.color);
})