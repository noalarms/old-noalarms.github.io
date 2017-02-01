/*
keep track of mouse click positions
draw a polygon from all the mouse click positions
*/

var x = [];
var y = [];

function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(200);
	stroke(200,0,0);


	//fill(255,192,203);
	//rect(mouseX-100,mouseY-100,200,200,20);
  	//line(0,0,mouseX,mouseY);

  	beginShape();
  	//draw a polgyon with the values
  	for(var i=0;i<x.length;i++){
  		//ellipse(x[i],y[i],20,20);
  		//vertex(x[i],y[i]);
  		fill(0, 102, 153);
  		text("X: " + x[i] + ", Y: " + y[i], x[i],y[i]);
  	}
  	endShape(CLOSE);

}

function mouseReleased() {
	console.log("click: " + mouseX + ", " + mouseY);
	append(x, mouseX);
	append(y, mouseY);
	console.log(x);
	console.log(y);
	//x.push();
}