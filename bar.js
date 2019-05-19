var host;
const margin = {'top':50,'right':50,'bottom':50,'left':50};
const height = 600 - margin.top - margin.bottom;
const width = 770 - margin.left - margin.right;
const barWidths = {'large':48, 'meduim':32, 'small':16};
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
setup()
setScales()
