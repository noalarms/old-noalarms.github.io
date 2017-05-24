

var width = 650;
var height = 650;

var barCalWidth = 1200;
var barCalHeight = 100;

var svgContainer;
var svgChart;
var svgBarCal;

var numReports = [];
var daysInYear = [];
var vizSvg;

var x1 = width/2,
	y1 = height/2;

var baseColor = "#444";
var singleColor = "#FC9272"; 

var testarr;

var data = [[]];

var theData = [];

var currMonth = 4;
var currMonthName = "Apr";
var currDay;
var currDayName;
var currTime;
var currYear = 16;

var dec70 = 240;
var dec90 = 185;
var dec110 = 125;
var dec130 = 69;

var banging, horn, carMusic, engine, party, talking, tv;
banging = horn = carMusic = engine = party = talking = tv = 0;

var noiseColors = ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d']

data = [[120,94],[790,150],[720,210],[1440,94],[840,265]]; // [time,decibel]
// 2am, 1:10pm, 12pm, 2pm
// 94 = highest
// 150 = 2nd
// 210 = 3rd
// 265 = lowest

var mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var radians = 0.0174532925, 
	clockRadius = 310,
	margin = 50,
	cWidth = (clockRadius+margin)*2,
    cHeight = (clockRadius+margin)*2,
    hourHandLength = 2*clockRadius/3,
    minuteHandLength = clockRadius,
    secondHandLength = clockRadius-12,
    secondHandBalance = 30,
    secondTickStart = clockRadius-8;
    secondTickLength = -10,
    hourTickStart = clockRadius,
    hourTickLength = -18
    secondLabelRadius = clockRadius + 16;
    secondLabelYOffset = 5
    hourLabelRadius = clockRadius - 35,
    hourLabelYOffset = 7;


var hourScale = d3.scaleLinear()
	// works for number label
	.range([0,360])
	.domain([0,24]);

var hourTickScale = d3.scaleLinear()
	// works for ticks
	.range([0,360])
	.domain([1,25]);

var minuteScale = secondScale = d3.scaleLinear()
	.range([0,360])
	.domain([0,120]);


var yearScale = d3.scaleTime()
	.range([new Date(2016,0,1),new Date(2016,11,31)])
	.domain([0,barCalWidth]);



var zips = [/*"Central Harlem":*/[10026, 10027, 10030, 10037, 10039],
		  /*"Chelsea and Clinton":*/[10001, 10011, 10018, 10019, 10020, 10036],	
		  /*"East Harlem":*/[10029, 10035],
		  /*"Gramercy Park and Murray Hill":*/[10010, 10016, 10017, 10022],
		  /*"Greenwich Village and Soho":*/[10012, 10013, 10014],
		  /*"Lower Manhattan":*/[10004, 10005, 10006, 10007, 10038, 10280, 10282],
		  /*"Lower East Side":*/[10002, 10003, 10009],
		  /*"Upper East Side":*/[10021, 10028, 10044, 10065, 10075, 10128],
		  /*"Upper West Side":*/[10023, 10024, 10025],
		  /*"Inwood and Washington Heights":*/[10031, 10032, 10033, 10034, 10040]
		];	


var theDateVar;
var dateCount = [];

var setup = function(callback) {
	svgContainer = d3.select(".leftCol")
						.append("svg")
						.attr("width",width)
						.attr("height",height)
						.attr("class","radial");


	svgBarCal = d3.select("#barCal")
						.append("svg")
						.attr("width",barCalWidth)
						.attr("height",barCalHeight)
						.style("background","#FFF");

	theDataVar = d3.csv("noise 2016.csv", function(data) {
  		theData = data;
	  		dateCount = d3.nest()
		  .key(function(d) { return d["Created Date"]; })
		  .rollup(function(v) { return v.length; })
		  .entries(theData);

		var dateCountByMonth = [];
		var mArr = [];
		var mIndex = 1;
		for(var i = 0; i<dateCount.length; i++) {
			var key = dateCount[i].key;
			var m = key.substr(0, key.indexOf('/'));
			if(m == mIndex && mIndex < 13) {
				mArr.push(dateCount[i]);
				if (m == 12)
					dateCountByMonth[mIndex-1] = mArr;
			}
			else {
				dateCountByMonth[mIndex-1] = mArr;
				mArr = [];
				mArr.push(dateCount[i]);
				mIndex++;
			}
		}

		 drawBarCal(dateCountByMonth);

	});


	callback();
}

var drawBase = function() {

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",85)
		.style("fill","none")
		.style("stroke", baseColor);

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",140)
		.style("fill","none")
		.style("stroke", baseColor);

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",200)
		.style("fill","none")
		.style("stroke", baseColor);

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",256)
		.style("fill","none")
		.style("stroke", baseColor);

		// draw base lines
	for(var i = 0;i<24;i++) {
		drawLine(69,15*i, baseColor);
	}


	var face = svgContainer.append('g')
		.attr('id','clock-face')
		.attr('transform','translate(' + x1 + ',' + y1 + ')')

	//add marks for seconds
	face.selectAll('.second-tick')
		.data(d3.range(0,120)).enter()
			.append('line')
			.attr('class', 'second-tick')
			.style("stroke",baseColor)
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',secondTickStart)
			.attr('y2',secondTickStart + secondTickLength)
			.attr('transform',function(d){
				return 'rotate(' + secondScale(d) + ')';
			});

	//... and hours major ticks
	face.selectAll('.hour-tick')
		.data(d3.range(1,25)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.style("stroke",baseColor)
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.attr('transform',function(d){
				return 'rotate(' + hourTickScale(d) + ')';
			});

			// hour numbers 1-24
	face.selectAll('.hour-label')
		.data(d3.range(1,25))
			.enter()
			.append('text')
			.attr('class', 'hour-label')
			.attr('text-anchor','middle')
			.style("stroke","#BCBCBC")
			.attr('x',function(d){
				return hourLabelRadius*Math.sin(hourScale(d)*radians);
			})
			.attr('y',function(d){
				return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
			})
			.text(function(d){
				return d;
			});

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",27)
		.style("fill","#333")
		.style("font-size","14px")
		.style("stroke", baseColor)
		.attr("id","centerCircle");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-3)
		.append("tspan")
		.text("Feb")
		.attr("font-family", "sans-serif")
        .attr("font-size", "16px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("id","centerDateMonth");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1+17)
		.append("tspan")
		.text("15")
		.attr("font-family", "sans-serif")
        .attr("font-size", "16px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("id","centerDateDay");

	// draw white background rect behind each label
	svgContainer.append("rect")
		.attr("x",x1-10)
		.attr("y",y1-73)
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill","#111")
		.attr("stroke","none");
	svgContainer.append("rect")
		.attr("x",x1-10)
		.attr("y",y1-129)
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill","#111")
		.attr("stroke","none");
	svgContainer.append("rect")
		.attr("x",x1-10)
		.attr("y",y1-189)
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill","#111")
		.attr("stroke","none");
	svgContainer.append("rect")
		.attr("x",x1-10)
		.attr("y",y1-244)
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill","#111")
		.attr("stroke","none");

	// draw db(A) levels
	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-61)
		.append("tspan")
		.text("70")
		.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("class","decLabel");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-117)
		.append("tspan")
		.text("90")
		.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("class","decLabel");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-177)
		.append("tspan")
		.text("110")
		.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("class","decLabel");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-232)
		.append("tspan")
		.text("130 db(A)")
		.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("class","decLabel");

}

var drawCenter = function(month, day,small) {

	$("#centerCircle").remove();
	$("#centerDateMonth").remove();
	$("#centerDateDay").remove();

	svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",27)
		.style("fill","#333")
		.style("font-size","14px")
		.style("stroke", baseColor)
		.attr("id","centerCircle");

		var fontSize = "16px";
		var yVal1 = y1-3;
		var yVal2 = y1+17; 

		if (small) {
			fontSize = "12px";
			yVal1 = y1-3;
			yVal2 = y1+12;
		}

		svgContainer.append("text")
		.attr("x",x1)
		.attr("y",yVal1)
		.append("tspan")
		.text(month)
		.attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("id","centerDateMonth");

	svgContainer.append("text")
		.attr("x",x1)
		.attr("y",yVal2)
		.append("tspan")
		.text(day)
		.attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("id","centerDateDay");

}

var plotSingleData = function(month,day,year,dayName) {
	//remove existing data lines
	$(".dataLine").remove();
	plotData(month,day,year,dayName,false);
}

var recordData = function() {
	var date = new Date(2016);
	for(var i = 0; i < theData.length; i++) {

	}
}

var plotData = function(month,day,year,dayName,isSummedTogether) {
	if (!isSummedTogether) {
		banging = horn = carMusic = engine = party = talking = tv = 0;
		$('.num').html(0);
	}

	var scale = d3.scaleLinear()
		.domain([0,1440])
		.range([0,360]);

	currDay = day;
	currDayName = dayName;

	var theDate = month + "/" + day + "/" + year;

	//plot data now
	for(var i = 0; i < theData.length; i++) {
		if (theDate == theData[i]["Created Date"]) {
			var hourMin = theData[i]["Created Time"].split(":");
			var hour = +hourMin[0];
			var min = +hourMin[1];
			var totalMin = (hour*60)+min;

			var decLevel = 0;

			var color;

			if (theData[i].Descriptor.includes("Talking")) {
				decLevel = dec70;
				color = noiseColors[0];
				talking++;
				$("#dataPopover1 .tippy-tooltip-content ul").append("<li>hey</li>")
			}
			else if (theData[i].Descriptor.includes("Television")) {
				decLevel = dec70;
				color = noiseColors[1];
				tv++;
			}
			else if (theData[i].Descriptor.includes("Engine")) {
				decLevel = dec70;
				color = noiseColors[2];
				engine++;
			}
			else if (theData[i].Descriptor.includes("Banging")) {
				decLevel = dec70;
				color = noiseColors[3];
				banging++;
			}
			else if (theData[i].Descriptor.includes("Horn")) {
				decLevel = dec90;
				color = noiseColors[4];
				horn++;
			}
			else if (theData[i].Descriptor.includes("Car/Truck Music")) {
				decLevel = dec110;
				color = noiseColors[5];
				carMusic++;
			}
			else if (theData[i].Descriptor.includes("Party")) {
				decLevel = dec110;
				color = noiseColors[6];
				party++;
			}

			var neighborhood;

			for(var j = 0; j<zips.length;j++) {
				for(var k = 0; k<zips[j].length;k++) {
					if (theData[i]["Incident Zip"] == zips[j][k]) {
						switch(zips[j]) {
							case zips[0]:
								neighborhood = "Central Harlem";
								break;
							case zips[1]:
								neighborhood = "Chelsea and Clinton";
								break;
							case zips[2]:
								neighborhood = "East Harlem";
								break;
							case zips[3]:
								neighborhood = "Gramercy Park and Murray Hill";
								break;
							case zips[4]:
								neighborhood = "Greenwich Village and Soho";
								break;
							case zips[5]:
								neighborhood = "Lower Manhattan";
								break;
							case zips[6]:
								neighborhood = "Lower East Side";
								break;
							case zips[7]:
								neighborhood = "Upper East Side";
								break;
							case zips[8]:
								neighborhood = "Upper West Side";
								break;
							case zips[9]:
								neighborhood = "Inwood and Washington Heights";
							}
					}
				}
			}

			drawDataLine(decLevel,scale(totalMin),color,theData[i]["Created Time"],theData[i].Descriptor,neighborhood,day,dayName);
		}
	}

	// draw center date cirle on top of lines
	drawCenter(currMonthName,currDay,false);

	//show summary totals
	$(".banging .num").increment({coef: 1, speed:0, limit:banging});
	$(".horn .num").increment({coef: 1, speed:0, limit:horn});
	$(".carMusic .num").increment({coef: 1, speed:0, limit:carMusic});
	$(".engine .num").increment({coef: 1, speed:0, limit:engine});
	$(".party .num").increment({coef: 1, speed:0, limit:party});
	$(".talking .num").increment({coef: 1, speed:0, limit:talking});
	$(".tv .num").increment({coef: 1, speed:0, limit:tv});

}

var drawLabel = function(xPos,yPos,rotate,text) {
	var g = svgContainer.append("g");
	g.append("text")
		.attr("x",xPos-20)
		.attr("y",yPos-20)
		.text(text);
	g.style("transform","rotate("+rotate+"deg)")
		.style("transform-origin","10% 10%");
}

var drawLine = function(y2,rotate,color,isData) {
		svgContainer.append("line")
			.style("stroke",color)
			.attr("x1",x1)
			.attr("y1",y1)
			.attr("x2",x1)
			.attr("y2",y2)
			.style("transform","rotate("+rotate+"deg)")
			.style("transform-origin","bottom");
}

var drawDataLine = function(y2,rotate,color,time,desc,place,day,dayName) {

		var dataGroup = svgContainer.append("g");

		var theLine = dataGroup.append("line")
			.style("stroke",color)
			.attr("x1",x1)
			.attr("y1",y1)
			.attr("x2",x1)
			.attr("y2",y1)
			.style("transform","rotate("+rotate+"deg)")
			.style("transform-origin","bottom")
			.style("stroke-width","2")
			.style("stroke-linecap","round")
			.style("stroke-linejoin","round")
			.style("opacity","0.8")
			.attr("class","dataLine")
			.attr("rel","tooltip")
		  	.transition()
			.duration(800)
			.attr("x2", x1)
			.attr("y2", y2)
			.attr("title","testing title tooltip");

var pathEl = theLine.node();

var pathLength = pathEl.getTotalLength();

var pathPoint = pathEl.getPointAtLength(pathLength);

var point = svgContainer.append("svg:circle")
        .style("fill", "red")
        .attr("r", 5)
        .attr("cx", pathPoint.x)
        .attr("cy", pathPoint.y);

        svgContainer.append("circle")
        	.style("transform","rotate("+rotate+"deg)")
			.style("transform-origin",x1+"px "+y1+"px")
			.style("stroke",color)
			.style("opacity","0.8")
			.attr("cx",x1)
			.attr("cy",y2)
			.attr("r",0)
			.attr("fill",color)
			.attr("class","dataLine")
			.attr("rel","tooltip")
			//.on('mouseenter', tip.show)
  			//.on('mouseout', tip.hide)
  			.on("mouseover", function(d) {
		       div.transition()
		         .duration(200)
		         .style("opacity", .9);
		       div.html("<span class='place'>" + place + "</span>" + "</span><span class='time'><i class='fa fa-clock-o' aria-hidden='true'></i> " + time + "</span>, <span class='dayName'>" + dayName + "</span> "  + "<span class'currMonthTip'>" + currMonthName + "</span> " + "<span class='day'>" + day + "</span>, " + "<span class='year'>20" + currYear + "</span><p class='desc'>" + desc + "</p>")
		         .style("left", (d3.event.pageX + 13) + "px")
		         .style("top", (d3.event.pageY - 28) + "px");
		       })
		     .on("mouseout", function(d) {
		       div.transition()
		         .duration(300)
		         .style("opacity", 0);
		       })
			.attr("title","testing title tooltip")
			.transition()
			.delay(600)
			.duration(300)
			.attr("r","5");

			var data = [4, 8, 15, 16, 23, 42];

			var x = d3.scaleLinear()
			    .domain([0, d3.max(data)])
			    .range([0, 420]);

        	var tooltip = d3.select("svg")
			    .append("div")
			    .style("position", "absolute")
			    .style("z-index", "10")
			    .style("visibility", "hidden")
			    .style("background", "#FFF")
			    .text("a simple tooltip");

			d3.select("svg")
			  .selectAll("div")
			    .data(data)
			  .enter().append("div")
			    .style("width", function(d) { return x(d) + "px"; })
			    .text(function(d) { return d; })
	 
}

var drawScale = function() {
	svgChart = d3.select(".decibelChartContainer")
						.append("svg")
						.attr("width","100%")
						.attr("height","100%");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",128)
		.attr("y1",285)
		.attr("x2",128)
		.attr("y2",260);
	svgChart.append("text")
		.attr("x",125)
		.attr("y",250)
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Whisper");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",320) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",320) // top point, needs to be same as x1
		.attr("y2",240); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",230) // needs to be near x1
		.attr("y",230) // needs to be near y1
		//.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Normal Conversation,");
	svgChart.append("text")
		.attr("x",230) // needs to be near x1
		.attr("y",248) // needs to be near y1
		//.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Laughter");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",500) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",500) // top point, needs to be same as x1
		.attr("y2",230); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",420) // needs to be near x1
		.attr("y",220) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Vacuum Cleaner");
	svgChart.append("text")
		.attr("x",420) // needs to be near x1
		.attr("y",236) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("at 10 ft");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",570) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",570) // top point, needs to be same as x1
		.attr("y2",205); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",510) // needs to be near x1
		.attr("y",180) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Washing Machine");
	svgChart.append("text")
		.attr("x",510) // needs to be near x1
		.attr("y",196) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Dishwasher");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",640) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",640) // top point, needs to be same as x1
		.attr("y2",165); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",640) // needs to be near x1
		.attr("y",155) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Midtown Traffic");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",760) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",760) // top point, needs to be same as x1
		.attr("y2",165); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",760) // needs to be near x1
		.attr("y",140) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Motorcycle,");
	svgChart.append("text")
		.attr("x",760) // needs to be near x1
		.attr("y",155) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Lawnmower");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",820) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",820) // top point, needs to be same as x1
		.attr("y2",125); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",820) // needs to be near x1
		.attr("y",115) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Train");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",960) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",960) // top point, needs to be same as x1
		.attr("y2",120); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",900) // needs to be near x1
		.attr("y",93) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Jackhammer,");
	svgChart.append("text")
		.attr("x",900) // needs to be near x1
		.attr("y",110) // needs to be near y1
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Powersaw");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",1020) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",1020) // top point, needs to be same as x1
		.attr("y2",80); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",1020) // needs to be near x1
		.attr("y",70) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Stereo");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",1090) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",1090) // top point, needs to be same as x1
		.attr("y2",60); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",1090) // needs to be near x1
		.attr("y",50) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Thunderclap");

	svgChart.append("line")
		.style("stroke","#444")
		.attr("x1",1150) // bottom point, move left/right
		.attr("y1",285) // bottom point, stays at 185
		.attr("x2",1150) // top point, needs to be same as x1
		.attr("y2",30); // top point, length of line, lower is longer
	svgChart.append("text")
		.attr("x",1150) // needs to be near x1
		.attr("y",20) // needs to be near y1
		.attr("text-anchor","middle")
		.style("font-size","12px")
		.style("stroke","#EEE")
		.attr("letter-spacing","1px")
		.text("Nearby Jet");

}


var drawBarCal = function(frequencyArray) {
	
// Get all days in year by month
for(var i = 0; i<12; i++) {
	daysInYear.push(getDaysInMonth(i,2016));
}

		vizSvg = d3.select(".viz").append("svg").style("width","1260").style("height","160");
		vizSvg.on('mouseout', function(d) {
  				 	$(".titleToShow").text("Complaints in 2016");
  				 })
		var monthGroup;
		var monthGroup2;
		var xTotal = 0;
	for(var i = 0; i<12; i++) {
		monthGroup = vizSvg.append("g");
		var daysInYearData = daysInYear[i];
		var frequencyData = frequencyArray[i];

		// Display Month names
		monthGroup.append("text")
			.attr("x",0)
			.attr("y",10)
			.attr("font-family", "helvetica")
	        .attr("font-size", "14px")
	        .attr("font-weight","bold")
			.attr("fill","#FFF")
			.text(mNames[i]);

		var animationDuration = 0;
		var monthGroup;
		monthGroup.selectAll("rect")
	        .data(daysInYearData)
	        .enter()
	        .append("rect")
	        .attr("fill","#333")
	       .attr("x",function(d,i){ return i*3;})
	         .attr("y",20)
	         .attr("height",50)
	         .attr("width",function(d){return 3})
	         .attr("id",function(d) { 
	         	var fullDate = d.toString().split(" ",4);
	         	var dateString = fullDate.join("-");
	         	return dateString;
	         })
	         .attr("class","dateBar")
	         .on('mouseover', function(d) {
	         	var fullDate = d.toString().split(" ",4);
	         	var dateString = fullDate[0] + ", " + fullDate[1] + " " + parseInt(fullDate[2]) + " " + fullDate[3];
	         	$(".titleToShow").text(dateString);
	         })
	         .on('click',function(d){
	         	var tempDate = new Date(d); // eg. Tue Apr 19 2016 00:00:00 GMT-0400 (EDT)
				    var dateString = tempDate.toString();
				    var dateString1 = dateString.split(" ");
				    currDayName = dateString1[0];
				    var month = dateString1[1];
				    var day = parseInt(dateString1[2]);
				    currMonthName = month;
				    currMonth = getMonthFromString(month);
					currDay = day;
					currYear = dateString1[3].substring(2,4);

				   	drawCenter(month, day, false);
				   	banging = horn = carMusic = engine = party = talking = tv = 0;
				   	$('.num').html(0);
				   	plotSingleData(currMonth,currDay,currYear,currDayName);
	         })
	         .transition()
	         .duration(animationDuration)
	         .delay(function(d,i){
	         	return i*animationDuration
	         })
	         .attr("height",function(d){ return 135});//d*1}); //console.log("d: " + d); 

	         monthGroup.attr("class","days");
	         monthGroup.attr("id", "days-" + i);
	         monthGroup
	         .on('mouseover',function(d) {
	         	var id = this.id.split('-')[1];
	         	currMonth = id; // will be values 0-11
	         	var realMonthNum = +id + 1;
 				$("#showWeekdays-"+realMonthNum).css("visibility","visible");
 				$("#showWeekends-"+realMonthNum).css("visibility","visible");
	         });
	         monthGroup.on('mouseout',function(d){
	         	var id = this.id.split('-')[1];
	         	var realMonthNum = +id + 1;
 				$("#showWeekdays-"+realMonthNum).css("visibility","hidden");
	         	$("#showWeekends-"+realMonthNum).css("visibility","hidden");
	         });

	         // Compare frequency array at this month to the total num of days in this month to see
	         // if any differences and where. Then fill in the missing days into frequency array
	         var numDaysThisMonth = getDaysInMonth(i,2016);
	         for(var j = 0; j<numDaysThisMonth.length; j++) {
	         	var realDay = new Date(numDaysThisMonth[j]);
	         	var freqDay = new Date(frequencyData[j].key);
	         	if (realDay.getTime() != freqDay.getTime()) {
	         		var m = parseInt(realDay.getMonth() + 1);
					var d = parseInt(realDay.getDate());
					var y = (realDay.getFullYear()).toString().substring(2,4);
					var newDay = { key: m + "/" + d + "/" + y, value: 0 };
	         		frequencyData.splice(j,0,newDay);
	         	}
	         }

	         testarr = frequencyData;

	         animationDuration = 100;
	         // Now draw the frequencyArray on top for each month
	         monthGroup2 = vizSvg.append("g");
		var monthGroup2;
		monthGroup2.selectAll("rect")
	        .data(frequencyData)
	        .enter()
	        .append("rect")
	        .attr("fill","#EEE")
	       .attr("x",function(d,i){ return i*3;})
	         .attr("y",20)
	         .attr("height",0)
	         .attr("width",function(d){return 2})
	         .attr("id",function(d) { 
	         	return d.key;
	         })
	         .attr("class","dateFreqBar")
	         .on('mouseover', function(d) {
	         	var tempDate = new Date(d.key);
	         	var dateArray = tempDate.toString().split(" ");
	         	var dateString = dateArray[0] + ", " + dateArray[1] + " " + parseInt(dateArray[2]) + " " + dateArray[3];
	         	$(".titleToShow").text(dateString);
	         })
	         .on('click',function(d){

	         	 var tempDate = new Date(d.key); // eg. Tue Apr 19 2016 00:00:00 GMT-0400 (EDT)
				    var dateString = tempDate.toString();
				    var dateString1 = dateString.split(" ");
				    currDayName = dateString1[0];
				    var month = dateString1[1];
				    var day = parseInt(dateString1[2]);
				    currMonthName = month;
				    currMonth = getMonthFromString(month);
					currDay = day;
					currYear = dateString1[3].substring(2,4);

				   	drawCenter(month, day, false);
				   	banging = horn = carMusic = engine = party = talking = tv = 0;
				   	$('.num').html(0);
				   	plotSingleData(currMonth,currDay,currYear,currDayName);
	         })
	         .transition()
	         .duration(animationDuration)
	         .delay(function(d,i){
	         	return i*animationDuration
	         })
	         .attr("height",function(d){ return d.value}); //console.log("d: " + d); 

	         monthGroup2.attr("class","freq");
	         monthGroup2.attr("id","freq-" + i);
	         monthGroup2
	         .on('mouseover',function(d) {
	         	var id = this.id.split('-')[1];
	         	currMonth = id; // will be values 0-11
	         	var realMonthNum = +id + 1;
	         	$("#showWeekdays-"+realMonthNum).css("visibility","visible");
	         	$("#showWeekends-"+realMonthNum).css("visibility","visible");
	         });
	         monthGroup2.on('mouseout',function(d){
	         	var id = this.id.split('-')[1];
	         	var realMonthNum = +id + 1;
	         	$("#showWeekdays-"+realMonthNum).css("visibility","hidden");
	         	$("#showWeekends-"+realMonthNum).css("visibility","hidden");
	         });

	         var buttonGroup = monthGroup.append("g");
	         buttonGroup.attr("id","buttonGroup-" + i).style("display","none");

	         buttonGroup.append("rect")
			.attr("x",0)
			.attr("y",160)
			.attr("width",43)
			.attr("height",50)
			.attr("fill","#333")
			.attr("class","buttonWk")
			.on('click',function(d) {
				var n = parseInt(currMonth) + 1;
				for(var i = 0;i<mNames.length; i++) {
					var mNum = getMonthFromString(mNames[i]);
					if (mNum == n) {
						currMonthName = mNames[i];
					}
				}
				plotWeekdaysInMonth(n,currYear);
			});

	         buttonGroup.append("rect")
			.attr("x",50)
			.attr("y",160)
			.attr("width",43)
			.attr("height",50)
			.attr("fill","#333")
			.attr("class","buttonWk")
			.on('click',function(d) {
				for(var i = 0;i<mNames.length; i++) {
					var mNum = getMonthFromString(mNames[i]);
					if (mNum == n) {
						currMonthName = mNames[i];
					}
				}
				var n = parseInt(currMonth) + 1;
				plotWeekendsInMonth(n,currYear);
			});

			buttonGroup.append("text")
				.attr("x",3)
				.attr("y",172)
				.attr("font-size","10px")
				.attr("letter-spacing","1px")
				.attr("fill","#FFF")
				.style("stroke","#FFF")
				.attr("class","buttonColor")
				.on('click',function(d) {
				var n = parseInt(currMonth) + 1;
				for(var i = 0;i<mNames.length; i++) {
					var mNum = getMonthFromString(mNames[i]);
					if (mNum == n) {
						currMonthName = mNames[i];
					}
				}
				plotWeekdaysInMonth(n,currYear);
			})
				.text("wkdays");

			buttonGroup.append("text")
				.attr("x",55)
				.attr("y",172)
				.attr("font-size","10px")
				.attr("letter-spacing","1px")
				.attr('fill','#FFF')
				.style("stroke","#FFF")
				.attr("class","buttonColor")
				.on('click',function(d) {
				for(var i = 0;i<mNames.length; i++) {
					var mNum = getMonthFromString(mNames[i]);
					if (mNum == n) {
						currMonthName = mNames[i];
					}
				}
				var n = parseInt(currMonth) + 1;
				plotWeekendsInMonth(n,currYear);
			})
				.text("wknds");


             if (i>0) {
             	xTotal += (daysInYear[i-1].length * 3)+12;
				monthGroup.attr("transform","translate(" + xTotal + ",0)");
				monthGroup2.attr("transform","translate(" + xTotal + ",0)");
			}

	}

}


function getDaysInMonth(month, year) {
	 // Since no month has fewer than 28 days
	 var date = new Date(year, month, 1);
	 var days = [];
	 while (date.getMonth() === month) {
	    days.push(new Date(date));
	    date.setDate(date.getDate() + 1);
	 }
	 return days;
}

setup(function() {
	drawScale();
	drawBase();
	$("#centerDate").append("<span>date</span>")
	drawCenter("","",false);
});

// mon = abbreviated month, eg. Apr
function getMonthFromString(mon){

   var d = Date.parse(mon + "1, 2012");
   if(!isNaN(d)){
      return new Date(d).getMonth() + 1;
   }
   return -1;
 }


$(function() {
	$( "#datepicker" ).datepicker({
		onSelect: function(date) {
		    //do your processing here
		    alert(date);
		    var tempDate = new Date(date);
		    currDayName = tempDate.toString().substring(0,3);
		    var dateString = date.split(" ");
		    var month = dateString[1].substring(0,3);
		    var day = dateString[0];
		    currMonthName = month;
		    currMonth = getMonthFromString(month);
			currDay = day;

			currYear = dateString[2];
		   	drawCenter(month, day, false);
		   	banging = horn = carMusic = engine = party = talking = tv = 0;
		   	$('.num').html(0);
		   	plotSingleData(currMonth,currDay,currYear,currDayName);
		},
		changeMonth: true,
		monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      	changeYear: true,
      	minDate: new Date(2010, 1 - 1, 1), 
      	maxDate: new Date(2017, 3, 16),
      	onChangeMonthYear: function(year,month) {
      		currMonth = month;
      		currMonthName = $.datepicker.formatDate('M', new Date(year,month,0));
      		var tempYear = year.toString().slice(-2);
      		currYear = tempYear;
      	}
	});
	$( "#datepicker" ).datepicker( "option", "dateFormat", "d M, y");
});

// Create the tooltips only when document ready
$(document).ready(function () {
	$('.ui-state-hover').removeClass('ui-state-hover');
	$('.ui-state-active').removeClass('ui-state-active');

    // Change the first select to the document if you want to 
    // detect addition of elements accross the whole page!
    $('.dataLine').on('mouseenter', 'a[title]', function (event) {
        $(this).qtip({
            overwrite: false, // Don't overwrite tooltips already bound
            show: {
                event: event.type, // Use the same event type as above
                ready: true // Show immediately - important!
            }
        });
    });
    
    // Setup add more elements button
    $('#addmore').click(function () {
        $('<li />', {
            html: '<a title="Lorem ipsum: Added after page load!"><b>New</b> link!</a>'
        })
            .appendTo($('#more'));
    });

    $("#showWeekends").click(function() {
		plotWeekendsInMonth(currMonth,currYear,currDayName);
	});
	$("#showWeekdays").click(function() {
		plotWeekdaysInMonth(currMonth,currYear,currDayName);
	});


	  $("#buttons-jan").hover(function() {
	  	$("#showWeekdays-1").css("visibility","visible");
	 	$("#showWeekends-1").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-1").css("visibility","hidden");
	 	$("#showWeekends-1").css("visibility","hidden");
	  });
	  $("#buttons-feb").hover(function() {
	  	$("#showWeekdays-2").css("visibility","visible");
	 	$("#showWeekends-2").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-2").css("visibility","hidden");
	 	$("#showWeekends-2").css("visibility","hidden");
	  });
	  $("#buttons-mar").hover(function() {
	  	$("#showWeekdays-3").css("visibility","visible");
	 	$("#showWeekends-3").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-3").css("visibility","hidden");
	 	$("#showWeekends-3").css("visibility","hidden");
	  });
	  $("#buttons-apr").hover(function() {
	  	$("#showWeekdays-4").css("visibility","visible");
	 	$("#showWeekends-4").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-4").css("visibility","hidden");
	 	$("#showWeekends-4").css("visibility","hidden");
	  });
	  $("#buttons-may").hover(function() {
	  	$("#showWeekdays-5").css("visibility","visible");
	 	$("#showWeekends-5").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-5").css("visibility","hidden");
	 	$("#showWeekends-5").css("visibility","hidden");
	  });
	  $("#buttons-jun").hover(function() {
	  	$("#showWeekdays-6").css("visibility","visible");
	 	$("#showWeekends-6").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-6").css("visibility","hidden");
	 	$("#showWeekends-6").css("visibility","hidden");
	  });
	  $("#buttons-jul").hover(function() {
	  	$("#showWeekdays-7").css("visibility","visible");
	 	$("#showWeekends-7").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-7").css("visibility","hidden");
	 	$("#showWeekends-7").css("visibility","hidden");
	  });
	  $("#buttons-aug").hover(function() {
	  	$("#showWeekdays-8").css("visibility","visible");
	 	$("#showWeekends-8").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-8").css("visibility","hidden");
	 	$("#showWeekends-8").css("visibility","hidden");
	  });
	  $("#buttons-sep").hover(function() {
	  	$("#showWeekdays-9").css("visibility","visible");
	 	$("#showWeekends-9").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-9").css("visibility","hidden");
	 	$("#showWeekends-9").css("visibility","hidden");
	  });
	  $("#buttons-oct").hover(function() {
	  	$("#showWeekdays-10").css("visibility","visible");
	 	$("#showWeekends-10").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-10").css("visibility","hidden");
	 	$("#showWeekends-10").css("visibility","hidden");
	  });
	  $("#buttons-nov").hover(function() {
	  	$("#showWeekdays-11").css("visibility","visible");
	 	$("#showWeekends-11").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-11").css("visibility","hidden");
	 	$("#showWeekends-11").css("visibility","hidden");
	  });
	  $("#buttons-dec").hover(function() {
	  	$("#showWeekdays-12").css("visibility","visible");
	 	$("#showWeekends-12").css("visibility","visible");
	  }, function() {
	  	$("#showWeekdays-12").css("visibility","hidden");
	 	$("#showWeekends-12").css("visibility","hidden");
	  });
	  
	  $("#showWeekdays-1").click(function() {
			plotWeekdaysInMonth(1,16);
		});
		$("#showWeekends-1").click(function() {
			plotWeekendsInMonth(1,16);
		});
		$("#showWeekdays-2").click(function() {
			plotWeekdaysInMonth(2,16);
		});
		$("#showWeekends-2").click(function() {
			plotWeekendsInMonth(2,16);
		});

		$("#showWeekdays-3").click(function() {
					plotWeekdaysInMonth(3,16);
				});
				$("#showWeekends-3").click(function() {
					plotWeekendsInMonth(3,16);
				});

		$("#showWeekdays-4").click(function() {
					plotWeekdaysInMonth(4,16);
				});
				$("#showWeekends-4").click(function() {
					plotWeekendsInMonth(4,16);
				});

		$("#showWeekdays-5").click(function() {
					plotWeekdaysInMonth(5,16);
				});
				$("#showWeekends-5").click(function() {
					plotWeekendsInMonth(5,16);
				});

		$("#showWeekdays-6").click(function() {
					plotWeekdaysInMonth(6,16);
				});
				$("#showWeekends-6").click(function() {
					plotWeekendsInMonth(6,16);
				});

		$("#showWeekdays-7").click(function() {
					plotWeekdaysInMonth(7,16);
				});
				$("#showWeekends-7").click(function() {
					plotWeekendsInMonth(7,16);
				});

		$("#showWeekdays-8").click(function() {
					plotWeekdaysInMonth(8,16);
				});
				$("#showWeekends-8").click(function() {
					plotWeekendsInMonth(8,16);
				});

		$("#showWeekdays-9").click(function() {
					plotWeekdaysInMonth(9,16);
				});
				$("#showWeekends-9").click(function() {
					plotWeekendsInMonth(9,16);
				});

		$("#showWeekdays-10").click(function() {
					plotWeekdaysInMonth(10,16);
				});
				$("#showWeekends-10").click(function() {
					plotWeekendsInMonth(10,16);
				});

		$("#showWeekdays-11").click(function() {
					plotWeekdaysInMonth(11,16);
				});
				$("#showWeekends-11").click(function() {
					plotWeekendsInMonth(11,16);
				});

		$("#showWeekdays-12").click(function() {
					plotWeekdaysInMonth(12,16);
				});
				$("#showWeekends-12").click(function() {
					plotWeekendsInMonth(12,16);
				});


});

$('.dataLine').qtip({
    content: {
        text: 'Support for SVG with no extra configuration! Awesome.'
    },
    position: {
        my: 'top left',
        at: 'bottom right'
    }
});

$('svg').tooltip({
    selector: '[rel=tooltip]'
});
$('[rel=tooltip]').tooltip({
    container: 'svg'
});

// month = the real numbered month, eg. 4 is Apr
var plotWeekendsInMonth = function(month,year) {
	banging = horn = carMusic = engine = party = talking = tv = 0;

	$('.num').html(0);

	for(var i = 0;i<mNames.length; i++) {
		var mNum = getMonthFromString(mNames[i]);
		if (mNum == month) {
			currMonthName = mNames[i];
		}
	}

	//remove existing data lines
	$(".dataLine").remove();
	$('.ui-state-active').removeClass('ui-state-active');

	$("td:not(.ui-datepicker-unselectable):not(.ui-datepicker-week-end)").removeClass("dayHighlight");
	$("td.ui-datepicker-week-end:not(.ui-datepicker-unselectable)").addClass("dayHighlight");

	var d = new Date("20" + year,(month-1).toString());
	var getTot = daysInMonth(d.getMonth()+1,d.getFullYear()); //Get total days in a month
	var sat = new Array();   //Declaring array for inserting Saturdays
	var sun = new Array();   //Declaring array for inserting Sundays

	for(var i=1;i<=getTot;i++){    //looping through days in month
	    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
	    if(newDate.getDay()==0){   //if Sunday
	        sun.push(i);
	    }
	    if(newDate.getDay()==6){   //if Saturday
	        sat.push(i);
	    }

	}

	for(var i = 0; i<sun.length;i++) {
		currDay = sun[i];
		currDayName = "Sun";
		plotData(month,sun[i],year,"Sun",true);
	}
	for(var j = 0; j<sat.length;j++) {
		currDay = sat[j];
		currDayName = "Sat";
		plotData(month,sat[j],year,"Sat",true);
	}

	drawCenter(currMonthName,"Wknds",true);

}

// month = the real numbered month, eg. 4 is Apr
var plotWeekdaysInMonth = function(month,year) {
	banging = horn = carMusic = engine = party = talking = tv = 0;

	$('.num').html(0);

	for(var i = 0;i<mNames.length; i++) {
		var mNum = getMonthFromString(mNames[i]);
		if (mNum == month) {
			currMonthName = mNames[i];
		}
	}

	//remove existing data lines
	$(".dataLine").remove();
	$('.ui-state-active').removeClass('ui-state-active');

	$("td.ui-datepicker-week-end:not(.ui-datepicker-unselectable)").removeClass("dayHighlight");
	$("td:not(.ui-datepicker-unselectable):not(.ui-datepicker-week-end)").addClass("dayHighlight");

	var d = new Date("20" + year,(month-1).toString());
	var getTot = daysInMonth(d.getMonth()+1,d.getFullYear()); //Get total days in a month
	var mon = new Array();   //Declaring array for inserting Saturdays
	var tue = new Array();   //Declaring array for inserting Sundays
	var wed = new Array();
	var thu = new Array();
	var fri = new Array();

	for(var i=1;i<=getTot;i++){    //looping through days in month
	    var newDate = new Date(d.getFullYear(),d.getMonth(),i)
	    if(newDate.getDay()==1){   //if Sunday
	        mon.push(i);
	    }
	    if(newDate.getDay()==2){   //if Saturday
	        tue.push(i);
	    }
	    if(newDate.getDay()==3){   //if Saturday
	        wed.push(i);
	    }
	    if(newDate.getDay()==4){   //if Saturday
	        thu.push(i);
	    }
	    if(newDate.getDay()==5){   //if Saturday
	        fri.push(i);
	    }

	}

	for(var i = 0; i<mon.length;i++) {
		currDay = mon[i];
		currDayName = "Mon";
		plotData(month,mon[i],year,"Mon",true);
	}
	for(var j = 0; j<tue.length;j++) {
		currDay = tue[j];
		currDayName = "Tue";
		plotData(month,tue[j],year,"Tue",true);
	}
	for(var j = 0; j<wed.length;j++) {
		currDay = wed[j];
		currDayName = "Wed";
		plotData(month,wed[j],year,"Wed",true);
	}
	for(var j = 0; j<thu.length;j++) {
		currDay = thu[j];
		currDayName = "Thu";
		plotData(month,thu[j],year,"Thu",true);
	}
	for(var j = 0; j<fri.length;j++) {
		currDay = fri[j];
		currDayName = "Fri";
		plotData(month,fri[j],year,"Fri",true);
	}

	drawCenter(currMonthName,"Wkdys",true);

}


function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

$.fn.increment= function(options) {

 var $this = $(this);

 var coef = options.coef;

 var speed = options.speed;

 var limit = options.limit;

 var value = 0;

 setInterval(function(){ 

	if (value < limit) {
     value = value + coef ;
    $this.html(value);
	}
 }, speed);

};

