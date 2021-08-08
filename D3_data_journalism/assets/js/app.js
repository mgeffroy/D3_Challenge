// @TODO: YOUR CODE HERE!
//// Make the space for the graph in the html ( go to html first to see where everything goes)
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
    top: 35,
    right: 35,
    bottom: 65,
    left: 55
  };

  // chart area minus margins
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  /// Chartgroup??? 
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  /// Open CSV document 
d3.csv("assets/data/data.csv").then(function(censusData){
    console.log(censusData);

// Choose which graph Smokers (censusData.smokes) vs. Age (censusData.age) or Healthcare (censusData.healthcare) vs. Poverty (censusData.poverty)
    // cast everything so they become integers except state abbreviation used for the circles 
 censusData.forEach(data => {
    data.smokes = +data.smokes;
    data.age = +data.age ;
    data.healthcare = +data.healthcare; 
    data.poverty = +data.poverty;
    statename = data.abbr;
    console.log(statename);
});

//get y scale (height) scaleLinear
var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(censusData, d => d.smokes)])
      .range([chartHeight, 0])

//get x scale (width) also scaleLinear
var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(censusData, d => d.age)])
      .range([0, chartWidth]);

// create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //append data to chart 
  chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

// select all, select data, enter data, append the circles and add attributes 
var circlesGroup = chartGroup.selectAll("circle")
.data(censusData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.age))
.attr("cy", d => yLinearScale(d.smokes))
.attr("r", "20")
.attr("fill", "limegreen")
.attr("opacity", ".5");


// Create text group 
var textGroup = chartGroup.append("g").selectAll("text")
.data(censusData)
.enter()
.append("text")
.classed("text", true)
.attr("x", d => xLinearScale(d.age) )
.attr("y", d => yLinearScale(d.smokes))
.text(d => d.abbr)
.attr("fill", "black")
.attr("opacity", ".5");
 

// Create the Axis labels
var labelGroup = chartGroup.append("g")
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20 })`);

// Create x label
var xLabel = labelGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.text("Age (years) ")
.style("font-weight", "bold")

// Create y label
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", 0 - (chartHeight/2))
.attr("y", 0 - chartMargin.left)
.attr("dy", "1em")
.text("Smokers (%)")
.style("font-weight", "bold")    
            

// closing parenthesis for csv reading 
});