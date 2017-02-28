/*
keep track of mouse click positions
draw a polygon from all the mouse click positions
*/

//python -m SimpleHTTPServer 8000

var numCounts = 5;

var time = "03:00:00";
var entryDelta = 0;
var exitDelta = 0;

var entryArray = [];
var exitArray = [];
var timeArray = [];
var dateArray = [];

var entryTotalsArray = [0,0,0,0,0,0,0];
var exitTotalsArray = [0,0,0,0,0,0,0];
var numDays = 6;
var dayTotal = 0;

var theDay = 11;

var grid1 = []; //contains all values with date and time made into numbers
var grid2 = []; //contains the final grid
var grid1a = [];
var grid1b = [0,0,0,0,0,0];
var grid1bExits = [0,0,0,0,0,0];

var dateIntArray = [];
var timeIntArray = [];

function preload() {
	table = loadTable("turnstile_170218-bedfordL.csv", "csv", "header");
	img = loadImage("icon-sick1.svg");
}

function setup() {
	createCanvas(1280, 1024);
	background('#333');

	/*	1. go through whole table
		2. get differences
		3. if next date is back to 11th, skip getting difference between current and next and iterate again
		4. loop
	*/
	for(var i=0;i<table.getRowCount()-1;i++) {
		date = table.get(i,"DATE");
		time = table.get(i,"TIME");
		entryDelta = Math.abs(table.get(i,"ENTRIES") - table.get(i+1,"ENTRIES"));
		exitDelta = Math.abs(parseInt(table.get(i,"EXITS")) - parseInt(table.get(i+1,"EXITS")));
		//console.log(date + " " + time + " " + entryDelta + " " + exitDelta);
		append(dateArray,date);
		append(timeArray,time);
		append(entryArray,entryDelta);
		append(exitArray,exitDelta);
		if (isNaN(exitDelta)) {
			console.log("nanprob: current i: " + parseInt(table.get(i,"EXITS")) + ", next i: " + parseInt(table.get(i+1,"EXITS")));
		}
		append(dateIntArray,date.replace(/\//g,""));
		append(timeIntArray,time.replace(/:/g,""));
	}

	console.log("-----------------------------hi-----------------------------" + table.getRowCount());

	//remove incorrect values where the diff is too large
	for(var i = 0;i<dateArray.length;i++) {
	    if(entryArray[i] > 10000) {
	       entryArray.splice(i, 1);
	       exitArray.splice(i,1);
	       timeArray.splice(i,1);
	       dateArray.splice(i,1);
	       timeIntArray.splice(i,1);
	       dateIntArray.splice(i,1);
	    }
	}

	//create 2d arrays
	for(var i=0;i<entryArray.length;i++) {
		grid1[i] = [parseInt(dateIntArray[i]),parseInt(timeIntArray[i]), entryArray[i], exitArray[i]];
	}
	//initialize array
	for(var i=0;i<numDays;i++) {
		grid2[i] = [];
	}

	//sort by date...
	grid1.sort(sortFunction);

	//split up grid1 by date, into their own date-grouped arrays
	for(var i=0;i<grid1.length;i++) {
		grid1a[i] = grid1.splice(0,78);
	}

	console.log("=============================================");
	console.log(grid1a);

	console.log("============================================");

	//...then sort by time for each date-grouped array
	for(var i=0;i<grid1a.length;i++) {
		grid1a[i].sort(compareSecondColumn);
 	}

	console.log(">>>>>>>>>");
	console.log(grid1a);

	console.log("here: "+grid1a[0][1][2]);
	console.log("here2: "+grid1a[0].length);
	console.log("here3:"+grid1a[0][1][1]);
	console.log("here4: " +grid1b[0]);

	//initialize grid of entry totals
	for(var i=0;i<6;i++) {
			grid1b[i] = [];
		for(var j=0;j<7;j++) {
			grid1b[i][j] = 0;
		}
	}

	//initialize grid of exit totals
	for(var i=0;i<6;i++) {
			grid1bExits[i] = [];
		for(var j=0;j<7;j++) {
			grid1bExits[i][j] = 0;
		}
	}

	console.log("grid1a:")
	console.log(grid1a);

	//ENTRIES
	//add up 2/11 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[0][i][1] == 30000) {
			grid1b[0][0] += parseInt(grid1a[0][i][2]);

		}
		else if (grid1a[0][i][1] == 70000) {
			grid1b[1][0] += parseInt(grid1a[0][i][2]);
		}
		else if (grid1a[0][i][1] == 110000) {
			grid1b[2][0] += parseInt(grid1a[0][i][2]);
		}
		else if (grid1a[0][i][1] == 150000) {
			grid1b[3][0] += parseInt(grid1a[0][i][2]);
		}
		else if (grid1a[0][i][1] == 190000) {
			grid1b[4][0] += parseInt(grid1a[0][i][2]);
		}
		else if (grid1a[0][i][1] == 230000) {
			grid1b[5][0] += parseInt(grid1a[0][i][2]);
		}
		else {
			//sum = 0;	
			console.log("yo");
		}
	}
	//add up 2/12 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[1][i][1] == 30000) {
			grid1b[0][1] += parseInt(grid1a[1][i][2]);
		}
		else if (grid1a[1][i][1] == 70000) {
			grid1b[1][1] += parseInt(grid1a[1][i][2]);
		}
		else if (grid1a[1][i][1] == 110000) {
			grid1b[2][1] += parseInt(grid1a[1][i][2]);
		}
		else if (grid1a[1][i][1] == 150000) {
			grid1b[3][1] += parseInt(grid1a[1][i][2]);
		}
		else if (grid1a[1][i][1] == 190000) {
			grid1b[4][1] += parseInt(grid1a[1][i][2]);
		}
		else if (grid1a[1][i][1] == 230000) {
			grid1b[5][1] += parseInt(grid1a[1][i][2]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/13 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[2][i][1] == 30000) {
			grid1b[0][2] += parseInt(grid1a[2][i][2]);
		}
		else if (grid1a[2][i][1] == 70000) {
			grid1b[1][2] += parseInt(grid1a[2][i][2]);
		}
		else if (grid1a[2][i][1] == 110000) {
			grid1b[2][2] += parseInt(grid1a[2][i][2]);
		}
		else if (grid1a[2][i][1] == 150000) {
			grid1b[3][2] += parseInt(grid1a[2][i][2]);
		}
		else if (grid1a[2][i][1] == 190000) {
			grid1b[4][2] += parseInt(grid1a[2][i][2]);
		}
		else if (grid1a[2][i][1] == 230000) {
			grid1b[5][2] += parseInt(grid1a[2][i][2]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/14 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[3][i][1] == 30000) {
			grid1b[0][3] += parseInt(grid1a[3][i][2]);
		}
		else if (grid1a[3][i][1] == 70000) {
			grid1b[1][3] += parseInt(grid1a[3][i][2]);
		}
		else if (grid1a[3][i][1] == 110000) {
			grid1b[2][3] += parseInt(grid1a[3][i][2]);
		}
		else if (grid1a[3][i][1] == 150000) {
			grid1b[3][3] += parseInt(grid1a[3][i][2]);
		}
		else if (grid1a[3][i][1] == 190000) {
			grid1b[4][3] += parseInt(grid1a[3][i][2]);
		}
		else if (grid1a[3][i][1] == 230000) {
			grid1b[5][3] += parseInt(grid1a[3][i][2]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/15 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[4][i][1] == 30000) {
			grid1b[0][4] += parseInt(grid1a[4][i][2]);
		}
		else if (grid1a[4][i][1] == 70000) {
			grid1b[1][4] += parseInt(grid1a[4][i][2]);
		}
		else if (grid1a[4][i][1] == 110000) {
			grid1b[2][4] += parseInt(grid1a[4][i][2]);
		}
		else if (grid1a[4][i][1] == 150000) {
			grid1b[3][4] += parseInt(grid1a[4][i][2]);
		}
		else if (grid1a[4][i][1] == 190000) {
			grid1b[4][4] += parseInt(grid1a[4][i][2]);
		}
		else if (grid1a[4][i][1] == 230000) {
			grid1b[5][4] += parseInt(grid1a[4][i][2]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/16 entry values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[5][i][1] == 30000) {
			grid1b[0][5] += parseInt(grid1a[5][i][2]);
		}
		else if (grid1a[5][i][1] == 70000) {
			grid1b[1][5] += parseInt(grid1a[5][i][2]);
		}
		else if (grid1a[5][i][1] == 110000) {
			grid1b[2][5] += parseInt(grid1a[5][i][2]);
		}
		else if (grid1a[5][i][1] == 150000) {
			grid1b[3][5] += parseInt(grid1a[5][i][2]);
		}
		else if (grid1a[5][i][1] == 190000) {
			grid1b[4][5] += parseInt(grid1a[5][i][2]);
		}
		else if (grid1a[5][i][1] == 230000) {
			grid1b[5][5] += parseInt(grid1a[5][i][2]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/17 entry values throughout the day
	for(var i=0;i<65;i++) {
		if (grid1a[6][i][1] == 30000) {
			grid1b[0][6] += parseInt(grid1a[6][i][2]);
		}
		else if (grid1a[6][i][1] == 70000) {
			grid1b[1][6] += parseInt(grid1a[6][i][2]);
		}
		else if (grid1a[6][i][1] == 110000) {
			grid1b[2][6] += parseInt(grid1a[6][i][2]);
		}
		else if (grid1a[6][i][1] == 150000) {
			grid1b[3][6] += parseInt(grid1a[6][i][2]);
		}
		else if (grid1a[6][i][1] == 190000) {
			grid1b[4][6] += parseInt(grid1a[6][i][2]);
		}
		else if (grid1a[6][i][1] == 230000) {
			grid1b[5][6] += parseInt(grid1a[6][i][2]);
		}
		else {
			console.log("yo");
		}
	}


	//EXITS
	//add up 2/11 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[0][i][1] == 30000) {
			grid1bExits[0][0] += parseInt(grid1a[0][i][3]);

		}
		else if (grid1a[0][i][1] == 70000) {
			grid1bExits[1][0] += parseInt(grid1a[0][i][3]);
		}
		else if (grid1a[0][i][1] == 110000) {
			grid1bExits[2][0] += parseInt(grid1a[0][i][3]);
		}
		else if (grid1a[0][i][1] == 150000) {
			grid1bExits[3][0] += parseInt(grid1a[0][i][3]);
		}
		else if (grid1a[0][i][1] == 190000) {
			grid1bExits[4][0] += parseInt(grid1a[0][i][3]);
		}
		else if (grid1a[0][i][1] == 230000) {
			grid1bExits[5][0] += parseInt(grid1a[0][i][3]);
		}
		else {
			//sum = 0;	
			console.log("yo");
		}
	}
	//add up 2/12 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[1][i][1] == 30000) {
			grid1bExits[0][1] += parseInt(grid1a[1][i][3]);
		}
		else if (grid1a[1][i][1] == 70000) {
			grid1bExits[1][1] += parseInt(grid1a[1][i][3]);
		}
		else if (grid1a[1][i][1] == 110000) {
			grid1bExits[2][1] += parseInt(grid1a[1][i][3]);
		}
		else if (grid1a[1][i][1] == 150000) {
			grid1bExits[3][1] += parseInt(grid1a[1][i][3]);
		}
		else if (grid1a[1][i][1] == 190000) {
			grid1bExits[4][1] += parseInt(grid1a[1][i][3]);
		}
		else if (grid1a[1][i][1] == 230000) {
			grid1bExits[5][1] += parseInt(grid1a[1][i][3]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/13 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[2][i][1] == 30000) {
			grid1bExits[0][2] += parseInt(grid1a[2][i][3]);
		}
		else if (grid1a[2][i][1] == 70000) {
			grid1bExits[1][2] += parseInt(grid1a[2][i][3]);
		}
		else if (grid1a[2][i][1] == 110000) {
			grid1bExits[2][2] += parseInt(grid1a[2][i][3]);
		}
		else if (grid1a[2][i][1] == 150000) {
			grid1bExits[3][2] += parseInt(grid1a[2][i][3]);
		}
		else if (grid1a[2][i][1] == 190000) {
			grid1bExits[4][2] += parseInt(grid1a[2][i][3]);
		}
		else if (grid1a[2][i][1] == 230000) {
			grid1bExits[5][2] += parseInt(grid1a[2][i][3]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/14 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[3][i][1] == 30000) {
			grid1bExits[0][3] += parseInt(grid1a[3][i][3]);
		}
		else if (grid1a[3][i][1] == 70000) {
			grid1bExits[1][3] += parseInt(grid1a[3][i][3]);
		}
		else if (grid1a[3][i][1] == 110000) {
			grid1bExits[2][3] += parseInt(grid1a[3][i][3]);
		}
		else if (grid1a[3][i][1] == 150000) {
			grid1bExits[3][3] += parseInt(grid1a[3][i][3]);
		}
		else if (grid1a[3][i][1] == 190000) {
			grid1bExits[4][3] += parseInt(grid1a[3][i][3]);
		}
		else if (grid1a[3][i][1] == 230000) {
			grid1bExits[5][3] += parseInt(grid1a[3][i][3]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/15 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[4][i][1] == 30000) {
			grid1bExits[0][4] += parseInt(grid1a[4][i][3]);
		}
		else if (grid1a[4][i][1] == 70000) {
			grid1bExits[1][4] += parseInt(grid1a[4][i][3]);
		}
		else if (grid1a[4][i][1] == 110000) {
			grid1bExits[2][4] += parseInt(grid1a[4][i][3]);
		}
		else if (grid1a[4][i][1] == 150000) {
			grid1bExits[3][4] += parseInt(grid1a[4][i][3]);
		}
		else if (grid1a[4][i][1] == 190000) {
			grid1bExits[4][4] += parseInt(grid1a[4][i][3]);
		}
		else if (grid1a[4][i][1] == 230000) {
			grid1bExits[5][4] += parseInt(grid1a[4][i][3]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/16 exit values throughout the day
	for(var i=0;i<grid1a[0].length;i++) {
		if (grid1a[5][i][1] == 30000) {
			grid1bExits[0][5] += parseInt(grid1a[5][i][3]);
		}
		else if (grid1a[5][i][1] == 70000) {
			grid1bExits[1][5] += parseInt(grid1a[5][i][3]);
		}
		else if (grid1a[5][i][1] == 110000) {
			grid1bExits[2][5] += parseInt(grid1a[5][i][3]);
		}
		else if (grid1a[5][i][1] == 150000) {
			grid1bExits[3][5] += parseInt(grid1a[5][i][3]);
		}
		else if (grid1a[5][i][1] == 190000) {
			grid1bExits[4][5] += parseInt(grid1a[5][i][3]);
		}
		else if (grid1a[5][i][1] == 230000) {
			grid1bExits[5][5] += parseInt(grid1a[5][i][3]);
		}
		else {
			console.log("yo");
		}
	}
	//add up 2/17 exit values throughout the day
	for(var i=0;i<65;i++) {
		if (grid1a[6][i][1] == 30000) {
			grid1bExits[0][6] += parseInt(grid1a[6][i][3]);
		}
		else if (grid1a[6][i][1] == 70000) {
			grid1bExits[1][6] += parseInt(grid1a[6][i][3]);
		}
		else if (grid1a[6][i][1] == 110000) {
			grid1bExits[2][6] += parseInt(grid1a[6][i][3]);
		}
		else if (grid1a[6][i][1] == 150000) {
			grid1bExits[3][6] += parseInt(grid1a[6][i][3]);
		}
		else if (grid1a[6][i][1] == 190000) {
			grid1bExits[4][6] += parseInt(grid1a[6][i][3]);
		}
		else if (grid1a[6][i][1] == 230000) {
			grid1bExits[5][6] += parseInt(grid1a[6][i][3]);
		}
		else {
			console.log("yo");
		}
	}

	console.log(grid1b);
	console.log(grid1bExits);

	fill('#A7A9AC');
	noStroke();
	ellipse(80,80,50,50);
	fill(255);
	textSize(34);
	//textFont("Helvetica")
	//textStyle(BOLD);
	text("L",71,91);

	fill(255);
	textStyle(NORMAL);
	textFont("Avenir");
	textSize(25);
	text("Bedford Ave",120,77);
	textSize(12);
	text("Feb 11th to 17th, 2017",122,100);

	//legend
	noFill();
	stroke(255);
	rect(300,60,10,10);
	fill(255);
	noStroke();
	text("Entries",317,70);
	noFill();
	stroke(255);
	ellipse(306,86,10,10);
	fill(255);
	noStroke();
	text("Exits",317,90);

	strokeWeight(1);
	stroke('#FF0000');
	//slanted lines for sick day legend
	line(301,107,304,110);
	line(301,104,307,110);
	line(301,101,310,110);
	line(304,101,310,107);
	line(307,101,310,104);
	text("Sick Pass.",317,110);

	//gradient legend
	noStroke();
	fill('#737578');
	rect(400,60,8,8);
	fill('#888A8C');
	rect(400,69,8,8);
	fill('#9E9FA1');
	rect(400,78,8,8);
	fill('#B3B4B5');
	rect(400,87,8,8);
	fill('#C9C9CA');
	rect(400,96,8,8);
	fill('#DFDFDF');
	rect(400,105,8,8);

	//gradient legend text
	fill(255);
	textSize(8);
	text("> 9000",414,67);
	//text("7000",414,77);
	text("~ 5000",414,87);
	//text("3000",414,97);
	text("< 1000",414,112);


	fill(255);
	textSize(12);
	text("Sat",117,140);
	text("Sun",165,140);
	text("Mon",215,140);
	text("Tue",266,140);
	text("Wed",315,140);
	text("Thu",366,140);
	text("Fri",418,140);

	textAlign(RIGHT);
	text("3am",90,154);
	text("7am",90,203);
	text("11am",90,253);
	text("3pm",90,303);
	text("7pm",90,353);
	text("11pm",90,403);
	text("3am",90,453);
	textAlign(LEFT);

	fill('#999');
	stroke('#333');

	var xx = 100;
	var yy = 150;

	//build grid displaying entries
	for(var i=0;i<grid1b.length;i++) { //6
		for(var j = 0;j<grid1b[0].length;j++) {//7 
			if (grid1b[i][j] <= 1000) {
				fill('#DFDFDF');
			}
			else if (grid1b[i][j] > 1000 && grid1b[i][j] <= 3000) {
				fill('#C9C9CA');
			}
			else if (grid1b[i][j] > 3000 && grid1b[i][j] <= 5000) {
				fill('#B3B4B5');
			}
			else if (grid1b[i][j] > 5000 && grid1b[i][j] <= 7000) {
				fill('#9E9FA1');
			}
			else if (grid1b[i][j] > 7000 && grid1b[i][j] <= 9000) {
				fill('#888A8C');
			}
			else if (grid1b[i][j] > 9000) {
				fill('#737578');
			}

			rect(xx,yy,50,50);
			xx += 50;
			
		}
		xx = 100;
		yy += 50;

	}

	//sick icon
	//image(img, 309, 309,32,32);

	//fill(0);
	//rect(500,200,32,32);

	xx = 125;
	yy = 175;

	//build grid displaying exits
	for(var i=0;i<grid1bExits.length;i++) { //6
		for(var j = 0;j<grid1bExits[0].length;j++) {//7 
			if (grid1bExits[i][j] <= 1000) {
				fill('#DFDFDF');
			}
			else if (grid1bExits[i][j] > 1000 && grid1bExits[i][j] <= 3000) {
				fill('#C9C9CA');
			}
			else if (grid1bExits[i][j] > 3000 && grid1bExits[i][j] <= 5000) {
				fill('#B3B4B5');
			}
			else if (grid1bExits[i][j] > 5000 && grid1bExits[i][j] <= 7000) {
				fill('#9E9FA1');
			}
			else if (grid1bExits[i][j] > 7000 && grid1bExits[i][j] <= 9000) {
				fill('#888A8C');
			}
			else if (grid1bExits[i][j] > 9000) {
				fill('#737578');
			}

			ellipse(xx,yy,25,25);
			xx += 50;
			
		}
		xx = 125;
		yy += 50;

	}

	//red square to indicate sick day
	noFill();
	stroke('#FF0000');
	//strokeWeight(2);
	//rect(302,302,47,47)

	strokeWeight(1);
	//slanted lines for sick day
	line(302,340,310,348);
	line(302,330,320,348);
	line(302,320,330,348);
	line(302,320,330,348);
	line(302,310,340,348);
	line(302,302,348,348);
	line(311,302,348,338);
	line(321,302,348,328);
	line(331,302,348,318);
	line(341,302,348,308);

}


function sortFunction(a, b) {
	    if (a[0] === b[0]) {
	        return 0;
	    }
	    else {
	        return (a[0] < b[0]) ? -1 : 1;
	    }
	}


function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function cloneArray(arr) {  
  // Deep copy arrays. Going one level deep seems to be enough.
  var clone = [];
  for (i=0; i<arr.length; i++) {
    clone.push( arr[i].slice(0) )
  }
  return clone;
}
