let width = 500;
let height = 500;
let padding = 30;

let yMax = d3.max(birthData2011, d => d.lifeExpectancy);
let yMin = d3.min(birthData2011, d => d.lifeExpectancy);
let yScale = d3.scaleLinear()
              .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
              .range([height - padding, padding]);
let xScale = d3.scaleLinear()
              .domain(d3.extent(birthData2011, d => d.births / d.population))
              .range([padding, width - padding]);

let xAxis = d3.axisBottom(xScale)
              .tickSize(-height + 2 * padding)
              .tickSizeOuter(0);
let yAxis = d3.axisLeft(yScale)
              .tickSize(-width + 2 * padding)
              .tickSizeOuter(0);

let colorScale = d3.scaleLinear()
                  .domain(d3.extent(birthData2011, d => d.population / d.area))
                  .range(['lightgreen', 'black']);
let radiusScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.births))
                    .range([2, 40]);
d3.select('svg')
  .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

d3.select('svg')
  .append('g')
    .attr('transform', `translate(${padding})`)    
  .call(yAxis);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .selectAll('circle')
  .data(birthData2011)
  .enter()
  .append('circle')
    .attr('cx', d => xScale(d.births / d.population))
    .attr('cy', d => yScale(d.lifeExpectancy))
    .attr('fill', d => colorScale(d.population / d.area))
    .attr('r', d => radiusScale(d.births));

d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding)
    .attr('dy', '1.5em')
    .style('text-anchor', 'middle')
    .text('Births per Capita');

d3.select('svg')
.append('text')
  .attr('x', width / 2)
  .attr('y', padding)
  .style('text-anchor', 'middle')
  .style('font-size', '1.5em')
  .text('Data On Births By Country In 2011');

d3.select('svg')
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', - height / 2)
    .attr('y', padding)
    .attr('dy', '-1.1em')
    .style('text-anchor', 'middle')
    .text('Life Expectancy');