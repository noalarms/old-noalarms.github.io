function setup() {
	createCanvas(windowWidth,windowHeight);
	loadJSON("colors.json", showData);
}

function showData(colors) {
	console.log(colors);
	fill(colors.green);
	textSize(50);
	text(colors.green, width/2, height/2);
}