var barChart = function(dataArray, title, yAxis, chart, links=false) {
	adjust_label = 0;
	if(title == "Time on page") {
	  adjust_label = 3;
	}
	var longestEntry =  dataArray.sort(function (a, b) { return b[1].length - a[1].length; })[0];
	dataArray = dataArray.sort(function(a, b){return b[0] - a[0];});
	dataArray = dataArray.map(function(item) {item[0] = Math.round(item[0]); return item;})

		var div = d3.select(chart).append("div")
		.attr("class", "barchart-tooltip")
		.style("opacity", 0);

		var margin = {top: 10, right: 20, bottom: longestEntry[1].length * 3, left: 80},
			width = 730 - margin.left - margin.right,
			height = longestEntry[1].length * 3 + 50;

		var x = d3.scaleBand().range([0, dataArray.length * (width/dataArray.length) + 10]);
		var y = d3.scaleLinear().range([height, 0]);

		var maxValue = d3.max(dataArray, function(d) { return d[0]; })
		maxValue = maxValue + maxValue/15
		y.domain([0, maxValue]);
		x.domain(dataArray.map(function(d) { return d[1]; }));

		var svg = d3.select(chart).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.selectAll("rect")
		    .data(dataArray)
		    .enter().append("rect")
		    .attr("class", "bar")
		    .attr("height", function(d, i) {return (d[0] * (height/maxValue))})
		    .attr("width","30")
		    .attr("x", function(d) {return x(d[1]) + 10;})
		    .attr("y", function(d, i) {return height - (d[0] * (height/maxValue))})
		    .style("opacity", function(d, i) {return ((2)*d[0]/maxValue) + .075;})
		    .on("mouseover", function(d) {
			div.transition()
			.duration(200)
			.style("opacity", 1)
			.style("position", "fixed")
			.style("left", (80 - d[1].length/2.25) + "%")
			.style("top", "5%")

			div.html(d[1])
		    })
		    .on("mouseout", function(d) {
			div.transition()
			.duration(500)
			.style("opacity", 0);
		    })
		    .on("click", function(d) {
			window.open("https://" + d[1], "_blank")
		    })

		svg.selectAll("text")
		    .data(dataArray)
		    .enter().append("text")
		    .text(function(d) {return d[0];})
		    .style("font-size", "12px")
		    .style("fill", "rgb(168, 78, 0)")
		    .style("font-weight", "bold")
		    .attr("x", function(d) {return x(d[1]) - adjust_label + 2  + 35/(d[0].toString().length);})
		    .attr("y", function(d, i) {return height - 5 - (d[0] * (height/maxValue))});

		// AXIS
		svg.append("g")
			.attr("class", 'y-axis')
			.call(d3.axisLeft(y));

		svg.append("g")
			.attr("class", 'x-axis')
			.call(d3.axisBottom(x))
			.attr("transform", "translate(0," + height + ")")
			.selectAll("text")
			.style("text-anchor", "start")
			.style("font-size", "12px")
			.attr("dx", ".8em")
			.attr("dy", "-.45em")
			.attr("transform", "rotate(90)")
			.data(dataArray)
			.on("mouseover", function(d) {
                                div.transition()
                                .duration(200)
                                .style("opacity", 1)
                                .style("position", "fixed")
                                .style("left", (75 - d[1].length/3) + "%")
                                .style("top", "5%")
                                .style("width", d[1].length)

                                div.html(d[1])

                        })
                        .on("mouseout", function(d) {
                                div.transition()
                                .duration(500)
                                .style("opacity", 0);
                        })
                        .on("click", function(d) {
                                window.open("https://" + d[1], "_blank")
                        })

		// AXIS LABLE
		// svg.append("text")
		// 	.attr("x", width/2)
		// 	.attr("y", height + 170 )
		// 	.style("text-anchor", "middle")
		// 	.text(xAxis)

		svg.append("text")
			.attr("x", -height/2)
			.attr("y", -margin.left + 20)
			.style("text-anchor", "middle")
			.text(yAxis)
			.attr("transform", "rotate(-90)")

		// TITLE
		//svg.append("text")
		//	.attr("x", (width / 2) + 60)
		//	.attr("y", 20 - (margin.top / 2))
		//	.attr("text-anchor", "middle")
		//	.style("font-size", "30px")
		//	.style('font', 'sans-serif')
		//	.text(title);

}

var pieChart = function(dataArray, chart) {
	dataArray.forEach(function(d) {
	    d[2] = true;                        
	});

	var width = 720;
	var height = 360;
	var radius = Math.min(width, height) / 2;

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var svg = d3.select(chart)
	  .append('svg')
	  .attr('width', width)
	  .attr('height', height)
	  .append('g')
	  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

	var arc = d3.arc()
	  .innerRadius(0)
	  .outerRadius(radius);

	var pie = d3.pie()
	  .value(function(d) { return d[0]; })
	  .sort(null);

	var path = svg.selectAll('path')
	  .data(pie(dataArray))
	  .enter()
	  .append('path')
	  .attr('d', arc)
	  .attr('fill', function(d, i) {
	    return color(d.data[1]);
	  })
	  .each(function(d) { this._current = d; });

	path.on('mouseover', function(d) {
	  var total = d3.sum(dataArray.map(function(d) {
	    return (d[2]) ? d[0] : 0;
	  }));
	  var percent = d.data[0];
	  tooltip.select('.label').html(d.data[1]);
	  tooltip.select('.percent').html(percent + '%');
	  tooltip.style('display', 'block');
	});

	path.on('mouseout', function() {
	  tooltip.style('display', 'none');
	});

	path.on('mousemove', function(d) {
	  tooltip.style('top', (d3.event.layerY + 10) + 'px')
	    .style('left', (d3.event.layerX + 10) + 'px');
	});

	var legendRectSize = 18;
	var legendSpacing = 4;

	var legend = svg.selectAll('.legend')
	  .data(color.domain())
	  .enter()
	  .append('g')
	  .attr('class', 'legend')
	  .attr('transform', function(d, i) {
	    var height = legendRectSize + legendSpacing;
	    var offset =  height * color.domain().length / 2;
	    var horz = 220
	    var vert = i * height - offset;
	    return 'translate(' + horz + ',' + vert + ')';
	  });

	legend.append('rect')
	  .attr('width', legendRectSize)
	  .attr('height', legendRectSize)
	  .style('fill', color)
	  .style('stroke', color)
	  .on('click', function(label) {
		  var rect = d3.select(this);
		  var enabled = true;
		  var totalEnabled = d3.sum(dataArray.map(function(d) {
		    return (d[2]) ? 1 : 0;
		  }));

		  if (rect.attr('class') === 'disabled') {
		    rect.attr('class', '');
		  } else {
		    if (totalEnabled < 2) return;
		    rect.attr('class', 'disabled');
		    enabled = false;
		  }

		  pie.value(function(d) {
		    if (d[1] === label) d[2] = enabled;
		    return (d[2]) ? d[0] : 0;
		  });

		  path = path.data(pie(dataArray));

		  path.transition()
		    .duration(750)
		    .attrTween('d', function(d) {
		      var interpolate = d3.interpolate(this._current, d);
		      this._current = interpolate(0);
		      return function(t) {
		        return arc(interpolate(t));
		      };
		    });
	  });

	legend.append('text')
	  .attr('x', legendRectSize + legendSpacing)
	  .attr('y', legendRectSize - legendSpacing)
	  .text(function(d) { return d; });

	var tooltip = d3.select(chart)         
	  .append('div')                            
	  .attr('class', 'pie-chart-tooltip');               

	tooltip.append('div')                        
	  .attr('class', 'label');                  
	tooltip.append('div')                        
	  .attr('class', 'percent');
}
