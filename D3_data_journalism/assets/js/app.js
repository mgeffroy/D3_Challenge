// @TODO: YOUR CODE HERE!
//// Make the space for the graph in the html ( go to html first to see where everything goes)
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

  // chart area minus margins
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
  /// Create the svg (select, append, etc.)

d3.csv("assets/data/data.csv").then(function(censusData){
    console.log(censusData);

// cast everything so they become integers 


// get y scale (height) scaleLinear

// get x scale (width) also scaleLinear

// create axes

//append data to chart 

// select existing svg in the html 
// select all, select data, enter data, append the circles and add attributes 






// closing parenthesis for csv reading 
});