/*
keep track of mouse click positions
draw a polygon from all the mouse click positions
*/

//python -m SimpleHTTPServer 8000

var table;
var gjson;
var totalsArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var ethTotal = 0;
//var ethPropArray = [0,0,0,0,0,0];
var ethTotalBarWidth = 955;
var numEthnicities = 6;
var startingX = 32;
var startingY = 140;

var ethBarWidths = [];
var ethBarWidthsAlpha = [];
//fill in colors here
var ethColors = ['#9BB868','#fdca59','#cb4051','#9745b3','#4497c0','#878c52'];

var maleTotal = 0;
var femTotal = 0;
var genderTotal = 0;
var maleBar = 0;
var femBar = 0;
var genderTotalBarHeight = 160;
var imgMale;
var imgFem;

var hh360Array =[0,0];
var oneHH = 0;
var twoHH = 0;
var totalHH = 0;
var circleTotal = 360;
var pieX = 630;
var pieY = 360;

var occLength = 859;
var occTotal = 0;
var vacTotal = 0;
var occOwnerTotal = 0;
var occRenterTotal = 0;
var occBar = 0;
var vacBar = 0;
var occOwnerBar = 0;
var occRenterBar = 0;

function preload() {
	table = loadTable("democsv-min.csv", "csv", "header");
	//gjson = loadJSON("demographic2.geojson");
	imgMale = loadImage("icon-male2.svg");
  	imgFem = loadImage("icon-female2.svg");
}

function setup() {
	createCanvas(1024,860);
	//img.mask(imgMask);
 	//imageMode(CENTER);
 	//var mymap = L.map('mapid').setView([40.758896,  -73.985130], 13);
 	// get the tiles you need. You don't have to touch this
/* L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

function basement(feature, layer) {
	layer.bindPopup("hey");
}

L.geoJson(demodata, {
	onEachFeature: basement
}).addTo(mymap);
//});
console.log(demodata);*/
 //L.geoJson(gjson).addTo(mymap);
 //L.geoJson(gjson, {
    /*style: function (feature) {
        return {color: feature.properties.color};
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.description);
    }*/
//}).addTo(map);
//var geojsonLayer = new L.GeoJSON.AJAX("demographic.geojson");       
//geojsonLayer.addTo(mymap);

//console.log(gjson);


	//create an array of totals for each column
	for(var i=0;i<table.getRowCount();i++){
		for(var j=0;j<table.getColumnCount();j++){
			totalsArray[j] += float(table.get(i,j));
		}
	}

	//get total ethnicities from totals array
	for(var i=0;i<numEthnicities;i++){
		ethTotal += int(totalsArray[i+1]);
	}

	//get bar widths for each ethnicity
	for(var i=0;i<numEthnicities;i++) {
		ethBarWidths[i] = (totalsArray[i+1]/ethTotal)*ethTotalBarWidth;
	}
	
	//switch values around to make it alphabetical by ethnicity
	ethBarWidthsAlpha[0] = ethBarWidths[1];
	ethBarWidthsAlpha[1] = ethBarWidths[2];
	ethBarWidthsAlpha[2] = ethBarWidths[3];
	ethBarWidthsAlpha[3] = ethBarWidths[5];
	ethBarWidthsAlpha[4] = ethBarWidths[0];
	ethBarWidthsAlpha[5] = ethBarWidths[4];

	var ethBarWidthsSum=0;
	for(var i=0;i<numEthnicities;i++){
		ethBarWidthsSum += int(ethBarWidths[i]);
	}
	
	//get gender totals
	maleTotal = int(totalsArray[7]);
	femTotal = int(totalsArray[8]);
	genderTotal = maleTotal+femTotal;
	//console.log("male:" + maleTotal + " fem:" + femTotal + " total:" + genderTotal);
	femBar = (femTotal/genderTotal)*genderTotalBarHeight;
	maleBar = (maleTotal/genderTotal)*genderTotalBarHeight;

	//get household totals
	oneHH = int(totalsArray[9]);
	twoHH = int(totalsArray[10]);
	totalHH = oneHH + twoHH;
	hh360Array[0] = (oneHH/totalHH)*circleTotal;
	hh360Array[1] = (twoHH/totalHH)*circleTotal;

	//get occupancy totals
	//occTotal = int(totalsArray[11]);
	vacTotal = int(totalsArray[12]);
	occOwnerTotal = int(totalsArray[13]);
	occRenterTotal = int(totalsArray[14]);
	occOwnerAndRenterTotal = occOwnerTotal+occRenterTotal;
	occTotal = vacTotal + occOwnerAndRenterTotal;
	vacBar = (vacTotal/occTotal)*occLength;
	occBar = (occOwnerAndRenterTotal/occTotal)*occLength;
	occOwnerBar = (occOwnerTotal/occTotal)*occLength;
	occRenterBar = (occRenterTotal/occTotal)*occLength;

	console.log("vacTotal: " + vacTotal);
	console.log("occOwnerTotal: " + occOwnerTotal);
	console.log("occRenterTotal: " + occRenterTotal);
	console.log("occOwnerAndRenterTotal: " + occOwnerAndRenterTotal);
	console.log("occTotal: " + occTotal);
	console.log("vacBar: " + vacBar);
	console.log("occBar: " + occBar);
	console.log("occOwnerBar: " + occOwnerBar);
	console.log("occRenterBar: " + occRenterBar);
	console.log(occLength);
}


function draw() {
	background(255);
	fill(0);

	noStroke();
	textSize(24);
	textFont("Helvetica-Light");
	text("NYC Demographics", 32, 32);

	//Ethnicity
	textSize(18);
	text("Ethnicity", 32, 92);

	
	textSize(14);
	text("Total Pop: " + int(totalsArray[0]), 32, 118);

	fill(ethColors[0]);
	rect(230,78,16,16);
	fill(0);
	text("African American", 255, 92);
	textAlign(RIGHT);
	text("" + int(totalsArray[2]),363,118);
	textAlign(LEFT);
	fill(ethColors[1]);
	rect(390,78,16,16);
	fill(0);
	text("American Indian & Islander", 415, 92);
	textAlign(RIGHT);
	text("" + int(totalsArray[3]),587,118);
	textAlign(LEFT);
	fill(ethColors[2]);
	rect(612,78,16,16);
	fill(0);
	text("Asian", 640, 92);
	textAlign(RIGHT);
	text("" + int(totalsArray[4]),677,118);
	textAlign(LEFT);
	fill(ethColors[3]);
	rect(700,78,16,16);
	fill(0);
	text("Hispanic/Latino", 726, 92);
	textAlign(RIGHT);
	text("" + int(totalsArray[6]),825,118);
	textAlign(LEFT);
	fill(ethColors[4]);
	rect(842,78,16,16);
	fill(0);
	text("White", 868, 92);
	textAlign(RIGHT);
	text("" + int(totalsArray[1]),905,118);
	textAlign(LEFT);
	fill(ethColors[5]);
	rect(925,78,16,16);
	fill(0);
	text("Other", 950, 92);
	textAlign(RIGHT);
	text(int(totalsArray[5]),986,118);
	textAlign(LEFT);

	//rect(32,140,barWidth,50);
	push();
	//translate(startingX,startingY);
		//console.log(startingX);

	for(var i=0;i<numEthnicities;i++) {
		var colour = map(i*50,0,ethBarWidthsAlpha[i],0,255);
		//fill(colour,colour*2,colour*3);
		fill(ethColors[i]);
		rect(32,140,ethBarWidthsAlpha[i],50);
		translate(ethBarWidthsAlpha[i],0);
	}

	/*for(var i=0;i<numEthnicities;i++) {
		var colour = map(i*50,0,ethBarWidths[i],0,255);
		fill(colour);
		rect(startingX,startingY,ethBarWidths[i],50);
		startingX = ethBarWidths[i];
	}*/
	pop();

	//Gender
	textSize(18);
	text("Gender",32,270);
	push();

	//color of gender bars
	fill('#54565B');

	//fem bar
	rect(91,350,70,femBar);
	textSize(14);
	text(femTotal,32,355);

	image(imgFem, 90, 280, 76, 160);
	text(maleTotal,220,364);
	//male bar
	//9 pixels lower because 84(fem total)-75(male total)=9
	rect(276,359,70,maleBar);
	image(imgMale, 270, 280, 76, 160);
	
	//covers up borders of male image
	//noFill();
	//rect(280,280,74,156)

	//covers up borders of female image, multiple rects
	fill('#fff');
	rect(163,280,3,160);
	rect(90,280,3,160);
	rect(90,280,75,3);
	rect(90,437,75,3);

	//covers up borders of male image, multiple rects
	fill('#fff');
	rect(270,280,3,160);
	rect(343,280,3,160);
	rect(270,280,75,3);
	rect(270,437,75,3);
	
	pop();

	//Households
	textSize(18);
	text("Households",550,270);
	pieChart(150, hh360Array);
	fill(255);
	ellipse(pieX,pieY,110,110);
	fill(0);
	textSize(14);
	text("One Person Household",750,325);
	text("Two Person+ Household",750,395);
	push();
	textAlign(RIGHT);
	text(oneHH,895,345);
	text(twoHH,902,415);
	pop();

	stroke(0);
	line(680,320,740,320);
	line(680,390,740,390);
	noStroke();

	//Housing Occupancy
	textSize(18);
	text("Housing Occupancy",32,520);
	textSize(14);
	textAlign(RIGHT);
	text("Occupied",110,580);
	text("Vacant",110,640);

	textAlign(LEFT);
	stroke(0);
	line(120,540,120,680);
	line(120,680,980,680);
	noStroke();
	text("0",120,705);
	text("200K",326,705);
	text("400K",532,705);
	text("600K",738,705);
	text("800K",945,705);


	//total occupancy
	//rect(121,560,occBar,30);
	fill('#AD0E6E');
	rect(121,560,occRenterBar,30);
	fill(255);
	text("Renter Occupied",136,580);
	fill('#EE4B51');
	rect(121+occRenterBar,560,occOwnerBar,30)
	fill(255);
	text("Owner Occupied",136+occRenterBar,580);
	fill('#AFE0ED');
	rect(121,620,vacBar,30);


	/*var ethBarWidth = 0;
	for(var i=0;i<ethPropArray.length;i++){
		var ethWidth = ethPropArray[i] * barWidth;
		//console.log(ethPropArray[i]);
		ethBar = ethPercent 
		var colour = map(i*50,0,ethWidth,0,255);
		fill(colour);
		rect(startingX,startingY,ethBarWidth,50);
		startingX = ethWidth;
		//console.log(startingX);
	}*/
	//pop();
	//ellipse(0,0,55,55);


	//fill(255,192,203);
	//rect(mouseX-100,mouseY-100,200,200,20);
  	//line(0,0,mouseX,mouseY);

  	//beginShape();
  	//draw a polgyon with the values
  	/*for(var i=0;i<x.length;i++){
  		//ellipse(x[i],y[i],20,20);
  		//vertex(x[i],y[i]);
  		fill(0, 102, 153);
  		text("X: " + x[i] + ", Y: " + y[i], x[i],y[i]);
  	}*/
  	//endShape(CLOSE);

}

function pieChart(diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    var gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(pieX, pieY, diameter, diameter, lastAngle, lastAngle+radians(data[i]));
    lastAngle += radians(data[i]);
  }
}

/*function mouseReleased() {
	console.log("click: " + mouseX + ", " + mouseY);
	append(x, mouseX);
	append(y, mouseY);
	console.log(x);
	console.log(y);
	//x.push();
}*/