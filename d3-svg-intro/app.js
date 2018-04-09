let minYear = birthData[0].year;
let maxYear = birthData[birthData.length - 1].year;
let width = 600;
let height = 600;
let barPadding = 10;
let numBars = 12;
let barWidth = width / numBars - barPadding;

d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('value', minYear)

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .selectAll('rect')
  .data(birthData.filter( d => {
    return d.year === minYear;
  }))
  .enter()
  .append('rect')
    .attr('width', barWidth)
    .attr('height', d => {
      return d.births / 2.5e6 * height;
    })
    .attr('y', d => {
      return height - d.births / 2.5e6 * height;
    })
    .attr('x', (d, i) => {
      return (barWidth + barPadding) * i;
    })
    .attr('fill', 'purple')

d3.select('input')
  .on('input', () => {
    let year = +d3.event.target.value;
    d3.selectAll('rect')
      .data(birthData.filter(d => {
        return d.year === year;
      }))
        .attr('height', d => {
          return d.births / 2.5e6 * height;
        })
        .attr('y', d => {
          return height - d.births / 2.5e6 * height;
        })
  })