

//var width = window.innerWidth*.8;
//var height = window.innerHeight*.8;

var width = 650;
var height = 650;

var svgContainer;

var x1 = width/2,
	y1 = height/2;

var baseColor = "#444";
var singleColor = "#FC9272"; 

var data = [[]];

var theData;

var currMonth;
var currMonthName;
var currDay;
var currTime;

var dec70 = 240;
var dec90 = 185;
var dec110 = 125;
var dec130 = 69;

data = [[120,94],[790,150],[720,210],[1440,94],[840,265]]; // [time,decibel]
// 2am, 1:10pm, 12pm, 2pm
// 94 = highest
// 150 = 2nd
// 210 = 3rd
// 265 = lowest

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

var setup = function(callback) {
	svgContainer = d3.select(".leftCol")
						.append("svg")
						.attr("width",width)
						.attr("height",height)
						.attr("class","radial");

	//d3.csv("man_cb1_nypd_noise-edit2-truncated-sortedByTime.csv");

	d3.csv("man_cb1_nypd_noise-edit2-truncated-sortedByTime.csv", function(data) {
  		theData = data;
  		console.log(theData[1]);
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

	/*svgContainer.append("circle")
		.attr("cx",x1)
		.attr("cy",y1)
		.attr("r",275)
		.style("fill","none")
		.style("stroke", baseColor);*/

		// draw base lines
	for(var i = 0;i<24;i++) {
		//if (i==0) {
			//drawLabel(x1,88,0,"db(A)");
		//}
		//else {
			drawLine(69,15*i, baseColor);
			//drawLabel(x1,88,14.4*i,"test");
		//}
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
	//and labels

	// draws second/minute number labels (works)
	/*face.selectAll('.second-label')
		.data(d3.range(5,121,5))
			.enter()
			.append('text')
			.attr('class', 'second-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return secondLabelRadius*Math.sin(secondScale(d)*radians);
			})
			.attr('y',function(d){
				return -secondLabelRadius*Math.cos(secondScale(d)*radians) + secondLabelYOffset;
			})
			.text(function(d){
				return d;
			});*/

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
		
		/*svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1)
		.text("hello")
			.attr("font-family", "sans-serif")
	        .attr("font-size", "18px")
			.attr("fill","#BCBCBC")
			.attr("stroke","none")
			.attr("text-anchor","middle")
			.attr("id","centerDate")
		.append("tspan")
			.text("there")
			.attr("dx","-40px")
			.attr("dy","20px")
			.attr("font-family", "sans-serif")
	        .attr("font-size", "18px")
			.attr("fill","#BCBCBC")
			.attr("stroke","none")
			.attr("text-anchor","middle")
			.attr("id","centerDate");*/

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


	/*svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-290)
		.append("tspan")
		.text("db(A)")
		.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")*/

}

var drawCenter = function(month, day) {

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

		svgContainer.append("text")
		.attr("x",x1)
		.attr("y",y1-3)
		.append("tspan")
		.text(month)
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
		.text(day)
		.attr("font-family", "sans-serif")
        .attr("font-size", "16px")
		.attr("fill","#BCBCBC")
		.attr("stroke","none")
		.attr("text-anchor","middle")
		.attr("id","centerDateDay");

}

/*var plotData = function(date,data) {
	currDate = date;
	var scale = d3.scaleLinear()
		.domain([0,1440])
		.range([0,345.6]);
	for(var i = 0;i<data.length;i++) {
		// drawLine(decibel, time, color)
		drawLine(data[i][1],scale(data[i][0]),"black");
		console.log(data[i][0]);
		console.log(data[i][1]);
		//console.log("scaled is " + scale(data[i][0]));
	}
}*/

var plotData = function(month,day,year,isData) {
	var scale = d3.scaleLinear()
		.domain([0,1440])
		.range([0,360]);
	
	//remove existing data lines
	$(".dataLine").remove();

	var theDate = month + "/" + day + "/" + year;

	//plot data now
	for(var i = 0; i < theData.length; i++) {
		if (theDate == theData[i]["Created Date"]) {
			//console.log("yes");
			var hourMin = theData[i]["Created Time"].split(":");
			console.log(hourMin);
			var hour = +hourMin[0];
			var min = +hourMin[1];
			var totalMin = (hour*60)+min;
			console.log(totalMin);

			var decLevel = 0;
			console.log(theData[i].Descriptor);

			if (theData[i].Descriptor.includes("Banging")) {
				decLevel = dec70;
			}
			else if (theData[i].Descriptor.includes("Horn")) {
				decLevel = dec90;
			}
			else if (theData[i].Descriptor.includes("Car/Truck Music")) {
				decLevel = dec110;
			}
			else if (theData[i].Descriptor.includes("Engine")) {
				decLevel = dec70;
			}
			else if (theData[i].Descriptor.includes("Party")) {
				decLevel = dec110;
				console.log("party");
			}
			else if (theData[i].Descriptor.includes("Talking")) {
				decLevel = dec70;
				console.log("talking");
			}
			else if (theData[i].Descriptor.includes("Television")) {
				decLevel = dec70;
			}

			drawDataLine(decLevel,scale(totalMin),singleColor,theData[i]["Created Time"],theData[i].Descriptor);
		}
	}

	/*d3.selectAll("line")
		.data(theData)
		.enter()
		.append("line")
		.style("stroke","black")
		.attr("x1",x1)
		.attr("y1",y1)
		.attr("x2",x1)
		.attr("y2",function(d) {
			console.log("test1");
			return dec130;

		})
		.style("transform",function(d) {
			var rotate = scale(790);
			console.log("test2" + rotate);
			return "rotate("+rotate+"deg)"
			})
			.style("transform-origin","bottom")
			.attr("class","dataline");*/

	/*for(var i = 0;i<data.length;i++) {
		// drawLine(decibel, time, color)
		drawLine(data[i][1],scale(data[i][0]),"black",true);
		console.log(data[i][0]);
		console.log(data[i][1]);
		//console.log("scaled is " + scale(data[i][0]));
	}*/


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

var drawDataLine = function(y2,rotate,color,time,desc) {

		var tipContent = rotate;

		/* Initialize tooltip */
		var tip = d3.tip().html(function(d) { return time + ": " + desc; });

		/* Invoke the tip in the context of your visualization */
		svgContainer.call(tip)

		svgContainer.append("line")
			.style("stroke",color)
			.attr("x1",x1)
			.attr("y1",y1)
			.attr("x2",x1)
			.attr("y2",y2)
			.style("transform","rotate("+rotate+"deg)")
			.style("transform-origin","bottom")
			.style("stroke-width","2")
			.attr("class","dataLine")
			.attr("rel","tooltip")
			.on('mouseover', tip.show)
  			.on('mouseout', tip.hide)
			.attr("title","testing title tooltip");
			//.transition()
        	//.duration(2000);
        	//.ease("linear");

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
			    .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
			      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
			      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			// draw center date cirle on top of lines
			drawCenter(currMonthName,currDay);
	 
}

setup(function() {
	drawBase();
	$("#centerDate").append("<span>date</span>")
	//plotData(currDate,data);
	drawCenter("","");

	//drawLine(88,40.25,"black");

	//drawLine(88,331.2,"black"); // loudest decibel, 12am

	// drawLine(decibel [length of line], time [rotate deg], color)
	//drawLine(200,13.8,"black"); // second loudest decibel, 1am
	//drawLine(88,27.6,"black"); // loudest decibel, 2am

/*	drawLine(88,20,"red");
	drawLine(200,30,"red");
	drawLine(320,40,"red");
	drawLine(430,80,"red");
	drawLine(430,90,"red");
	drawLine(430,180,"red");
	drawLine(430,270,"red");*/

});

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
		    //alert(date);
		    //do your processing here
		    var dateString = date.split(" ");
		    console.log(dateString);
		    var month = dateString[1].substring(0,3);
		    var day = dateString[0];
		    currMonthName = month;
		    currMonth = getMonthFromString(month);
			currDay = day;
			//currYear = "20" + dateString[2];
			currYear = dateString[2];
		    //$("#centerDateMonth").text(month);
		   	//$("#centerDateDay").text(day);
		   	drawCenter(month, day);
		   	plotData(currMonth,currDay,currYear);
		   	//console.log(currMonth + "/" + currDay + "/" + currYear);
		},
		changeMonth: true,
      	changeYear: true,
      	minDate: new Date(2010, 1 - 1, 1), 
      	maxDate: new Date(2017, 3, 16)
	});
	$( "#datepicker" ).datepicker( "option", "dateFormat", "d M, y");
});

// Create the tooltips only when document ready
$(document).ready(function () {
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