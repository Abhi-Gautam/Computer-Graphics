var xmotion = 0;
var ymotion = 0;

var objs = [];
var nn = 480;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(1000, 1000);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	for (var n = 0; n < nn; n += 1) {
		objs[n] = { x: windowWidth * random(), y: 0, vx: random(-1, 1) / 6000, vy: 1, n: random(-1, 1) * windowWidth, vv: random() };
	}
	
	ellipseMode(CENTER);
	rectMode(CENTER);
}

function compute() {
	fill(0);
	
	strokeWeight(1);

	for (var n = 0; n < nn; n += 1) {
		objs[n].n += objs[n].vx;
		objs[n].y += objs[n].vy;
		objs[n].x = -windowWidth + noise(objs[n].n+sin(xmotion*objs[n].y/windowHeight)/8) * windowWidth *2;
		
		//objs[n].y %= windowHeight;
		if (objs[n].y > windowHeight) {
			objs[n].y = 0;
			//objs[n].x += windowWidth * objs[n].n;
			//objs[n].x %= windowWidth;
			objs[n].n = random(-1, 1) * windowWidth
		}
		
		var dd = Infinity;
		var did = n;

		for (var i = 0; i < nn; i += 1) {
			var d = (abs((objs[n].x - objs[i].x) * (objs[n].x - objs[i].x)) + abs((objs[n].y - objs[i].y) * (objs[n].y - objs[i].y))); // sqrt
			if (i !== n && d < dd) {//1 * abs(objs[n].n)) {
				did = i;
				dd = d;
			}
		}
		
		if (did !== n) {
			objs[did].vx = -objs[did].vx;
		}
		
		var pa1 = 0.95, pa2 = 0.5 + cos(xmotion) / 2, pa3 = 0.95;
		var pb1 = objs[n].vv, pb2 = objs[n].vv, pb3 = objs[n].vv;
		var pc1 = 1, pc2 = 1, pc3 = 0.95;

		var pdr = objs[n].vv*0.8;
		var pdg = objs[n].vv*0.9;
		var pdb = objs[n].vv*0.95;

		var pt = noise(objs[n].n / windowWidth * 2 + xmotion*1.1);

		var rf = pal(pt, pa1, pb1, pc1, pdr) * 255;
		var gf = pal(pt, pa2, pb2, pc2, pdg) * 255;
		var bf = pal(pt, pa3, pb3, pc3, pdb) * 255;
		
		noFill();
		stroke(rf, gf, bf, 255 * pt);
		//line(objs[n].x, objs[n].y, objs[did].x, objs[did].y);
		//bezier(objs[n].x, objs[n].y, objs[n].x + objs[n].n, objs[n].y, objs[n].x, objs[n].y, objs[did].x, objs[did].y);
		bezier(objs[n].y, objs[n].x/1.05 + objs[n].n, objs[n].y/1.05, objs[n].x, objs[n].y, objs[n].x/1.05, objs[did].y/1.05, objs[did].x);
		//bezier(windowWidth - objs[n].x, windowHeight - objs[n].y, windowWidth - objs[n].x + objs[n].n, windowHeight - objs[n].y, windowWidth - objs[n].x, windowHeight - objs[n].y, windowWidth - objs[did].x, windowHeight - objs[did].y);
		//bezier(windowHeight - objs[n].y, windowWidth - objs[n].x + objs[n].n, windowHeight - objs[n].y, windowWidth - objs[n].x, windowHeight - objs[n].y, windowWidth - objs[n].x, windowHeight - objs[did].y, windowWidth - objs[did].x);
		noStroke();
		//noFill();
		stroke(pt*360, 0, 255, 255 * pt);
		//fill(pt*360, 0, 198, 255 * pt);
		//rect(objs[n].x, objs[n].y, 1 * pt, 1 * pt);
		//rect(objs[did].x, objs[did].y, 1, 1);
	}
}

function draw() {
	noStroke();
/*
	fill(0, 0, 0, 1);
	rect(0, 0, windowWidth, windowHeight);
*/
	compute();
	
	xmotion += 0.0008;
	ymotion += 0.0002;
}