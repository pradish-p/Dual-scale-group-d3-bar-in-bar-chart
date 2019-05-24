var host;
const margin = {'top':50,'right':50,'bottom':50,'left':50};
const height = 600 - margin.top - margin.bottom;
const width = 770 - margin.left - margin.right;
const barWidths = {'large':48, 'medium':32, 'small':16};
var svg;
var yAxisLeft;
var yAxisRight;
var xAxis;
var data = [{'country':'India','total':100,'suvs':50,'trucks':30,'totalPercentage':100,'salesPercentage':50},
            {'country':'China','total':120,'suvs':70,'trucks':20,'totalPercentage':100,'salesPercentage':70},
            {'country':'Chile','total':80,'suvs':40,'trucks':20,'totalPercentage':100,'salesPercentage':80},
            {'country':'Canada','total':100,'suvs':90,'trucks':40,'totalPercentage':100,'salesPercentage':90}]

function setup(){
  tooltip = d3.select('#tooltip');
  svg = d3.select('#chart')
          .append('svg')
          .attr('width',width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform',`translate(${margin.left},${margin.top})`)
}

function setScales(){
  let maxList = data.map(ele => (+(d3.max([ele.total,ele.suvs,ele.trucks]))))
  yAxisLeft = d3.scaleLinear()
                .range([height,0])
                .domain([0,d3.max(maxList)])
  yAxisRight = d3.scaleLinear()
                 .range([height,0])
                 .domain([0,100])

  xAxis = d3.scaleBand()
            .range([0,width])
            .domain(data.map(ele => (ele.country)))
            .padding(0.2)

  svg.append('g')
     .attr('class','grid')
     .call(d3.axisLeft(yAxisLeft)
             .tickSize(-width))
  svg.append('g')
     .attr('transform',`translate(${width},0)`)
     .call(d3.axisRight(yAxisRight))

  svg.append('g')
     .attr('transform',`translate(0,${height})`)
     .call(d3.axisBottom(xAxis))
     .selectAll("text")
     .each(wrap)
     .append("svg:title")
     .text(function(d,i){return d})
}

function wrap(){
  var self = d3.select(this);
  textLength = self.text().length;
  text = self.text()
  if(textLength > (25) && text.length >0){
    text = text.slice(0,10);
    self.text(text + '...')
    textLength = self.node().getComputedTextLength();
  }
}

function makeBars(){
svg.selectAll(".bar")
   .data(data)
   .enter().append("rect")
     .attr("class", "bar1")
     .attr("x", function(d) {return (xAxis(d.country) + (xAxis.bandwidth()/2)) - barWidths.large })
     .attr("y",(d) => {return yAxisLeft(d.total)})
     .attr('width', function(d){ return barWidths.large })
     // .attr("width", function(d) { return data.length<=3 ? 50 : x1.bandwidth() + 20; })
     .attr("height",(d) => yAxisLeft(0) - yAxisLeft(d.total))
     .attr('fill','white')
     .attr('stroke','black')
     .attr('stroke-width','0.25')
     .on('mouseover', function() {
       // context.handleMouseOver(this, rowIndex);
       showTooltip(this, 'total',d3.mouse(this));
     })
     .on('mouseout', function() {
       handleMouseOut(this, 0);
     })

 svg.selectAll(".bar2")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar2")
    .attr("x", function(d) {return  (xAxis(d.country) + (xAxis.bandwidth()/2)) - (barWidths.medium + (barWidths.large- barWidths.medium)/2)})
    .attr("y",d => {return this.yAxisLeft(d.suvs)})
    .attr("width", function(d) { return barWidths.medium})
    .attr("height",(d) => this.yAxisLeft(0) - this.yAxisLeft(d.suvs))
    .attr('fill','#d9feff')
    .attr('stroke','#005c5e')
    .attr('stroke-width','0.25')
    .style('box-shadow','5px 10px 8px #888888')
    .on('mouseover', function() {
      showTooltip(this, 'suvs',d3.mouse(this));
    })
    .on('mouseout', function() {
      handleMouseOut(this, 0);
    })

svg.selectAll(".bar3")
   .data(data)
   .enter().append("rect")
   .attr("class", "bar3")
   .attr("x", function(d) { return (xAxis(d.country) + (xAxis.bandwidth()/2)) - (barWidths.small + ((barWidths.large - barWidths.medium)/2 + (barWidths.medium - barWidths.small)/2))})
   .attr("y",d => {return yAxisLeft(d.trucks)})
   .attr("width", function(d) { return barWidths.small })
   .attr("height",(d) => this.yAxisLeft(0) - this.yAxisLeft(d.trucks))
   .attr('fill','#e81461')
   .attr('stroke','#6c0027')
   .attr('stroke-width','0.25')
   .on('mouseover', function() {
     showTooltip(this, 'trucks',d3.mouse(this));
   })
   .on('mouseout', function() {
     handleMouseOut(this, 0);
   })


 svg.selectAll(".pbar")
    .data(data)
    .enter().append("rect")
    .attr("class", "pbar")
    .attr("x", function(d) { return xAxis(d.country) + (xAxis.bandwidth()/2)})
    .attr("y",d => {return this.yAxisRight(d.totalPercentage)})
    .attr("width", function(d) { return barWidths.medium })
    .attr("height",(d) => this.yAxisRight(0) - this.yAxisRight(d.totalPercentage))
    .attr('fill','#f5f5f5')
    .attr('stroke','black')
    .attr('stroke-width','0.25')
    .on('mouseover', function() {
      showTooltip(this, 'totalPercentage',d3.mouse(this));
    })
    .on('mouseout', function() {
      handleMouseOut(this, 0);
    })

    this.svg.selectAll(".pbar1")
     .data(data)
     .enter().append("rect")
       .attr("class", "pbar1")
       .attr("x", function(d) { return xAxis(d.country) + (xAxis.bandwidth()/2) + (barWidths.medium - barWidths.small)/2 })
       .attr("y",d => {return yAxisRight(d.salesPercentage)})
       .attr("width", function(d) { return barWidths.small; })
       .attr("height",(d) => this.yAxisRight(0) - this.yAxisRight(d.salesPercentage))
       .attr('fill','#96e900')
       .attr('stroke','#233600')
       .attr('stroke-width','0.25')
       .on('mouseover', function() {
         showTooltip(this, 'salesPercentage',d3.mouse(this));
       })
       .on('mouseout', function() {
         handleMouseOut(this, 0);
       })
       // this.setBarColors({'green':0,'amber':10,'red':10})
}

function setAxisLables(){
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size","22px")
  .text("Vehicle Production");

 svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", width + 20)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size","22px")
    .text("Sales Percentage");
}

function showTooltip(element, type, position) {
  // Show tooltip
  tooltip
    .classed('hidden', false)
    .html(() => {
      return composeTooltipHtml(d3.select(element).datum(),type);
    })
    // .attr('transform', `translate(${150}, ${150})`)
    .style('left', () => {
      let positionPixels = 0;
      return `${position[0]}px`;
    })
    .style('top', () => {
      return `${position[1]+120}px`;
    })
    .style('background-color', 'white')
    .style('opacity', '1')
    .style('z-index','99999999')
}

function composeTooltipHtml(data,type) {
  let html = ''
  html = `<div>
        <span>${data[type]}</span>
          <br>
        <span></span>
      </div>`
  return html;
}

function handleMouseOut(element, rowIndex) {
  // Hide row highlighting bar
  d3.select('#highlight_row')
    .attr('width', 0)
    .attr('y', 0);

  // Hide Tooltip
    tooltip
      .style('left', '0px')
      .style('top', '0px')
      .classed('hidden', true);
}

setup();
setScales();
setAxisLables();
makeBars();
