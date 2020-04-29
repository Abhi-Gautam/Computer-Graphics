// same as "slime mold simulation" but with greatly reduced agents, probably overkill for what it is

var xmotion = 0;
var ymotion = 0;

var objs = [];
var trail_map = [];

var nnx = 5;
var nny = 5;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(800, 800);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	var inc = 0;
	for (var nx = 0; nx < nnx; nx += 1) {
	 var nmx = nx / nnx;
	 for (var ny = 0; ny < nny; ny += 1) {
		var n = parseInt(nx + ny * nnx);
		 
		var nmy = ny / nny;
		
		var no = noise(nmx * nmy);
		 
		var ni = inc / (nnx * nny);
		
		objs[n] = {
			// paper
			//lx: width * nmx,
			//ly: height * nmy,
			lx: width / 2 + sin(ni * PI * 2) * (width / 16 * nx),
			ly: height / 2 + cos(ni * PI * 2) * (height / 16 * nx),
			// paper
			//la: random(-PI * 2, PI * 2),
			la: random() * PI * 2,
			// paper : 1
			lv: 0.9 + random(0.1),
			d: 5,
			so: 3, // agent sensor offset,
			sa: 45 // agent sensor angle (degree)
		};
		 
		inc += 1;
	 }
	}
	
	for (var i = 0; i < width * height; i += 1) {
		trail_map[i] = 0;//i / (width * height);
	}
	
	ellipseMode(CENTER);
	rectMode(CENTER);
}

function compute() {
	fill(0);
	
	strokeWeight(3);

	for (var nx = 0; nx < nnx; nx += 1) {
	 for (var ny = 0; ny < nny; ny += 1) {
		var n = parseInt(nx + ny * nnx);
		 
		var obj = objs[n];
		
		var sensor_offset = obj.so;
		var sensor_angle = radians(obj.sa);
		
		// agent sensors
		var lhx = round(sin(obj.la - sensor_angle) * sensor_offset);
		var lhy = round(cos(obj.la - sensor_angle) * sensor_offset);
		var fhx = round(sin(obj.la) * sensor_offset);
		var fhy = round(cos(obj.la) * sensor_offset);
		var rhx = round(sin(obj.la + sensor_angle) * sensor_offset);
		var rhy = round(cos(obj.la + sensor_angle) * sensor_offset);
		
		var ailx = parseInt(obj.lx + lhx);
		var aily = parseInt(obj.ly + lhy);
		var aifx = parseInt(obj.lx + fhx);
		var aify = parseInt(obj.ly + fhy);
		var airx = parseInt(obj.lx + rhx);
		var airy = parseInt(obj.ly + rhy);
		
		ailx = ailx < 0 ? ailx + width : ailx;
		aily = aily < 0 ? aily + height : aily;
		aifx = aifx < 0 ? aifx + width : aifx;
		aify = aify < 0 ? aify + height : aify;
		airx = airx < 0 ? airx + width : airx;
		airy = airy < 0 ? airy + height : airy;
		
		ailx %= width;
		aily %= height;
		aifx %= width;
		aify %= height;
		airx %= width;
		airy %= height;
		
		// sensor sample
		var s1 = trail_map[ailx + aily * width]; // left
		var s2 = trail_map[aifx + aify * width]; // forward
		var s3 = trail_map[airx + airy * width]; // right
		
/*
		// debug sensor
		fill(255, 0, 0, 255);
		rect(ailx, aily, 1, 1);
		rect(aifx, aify, 1, 1);
		rect(airx, airy, 1, 1);
*/	
/*
		if (frameCount % 60 == 0) {
			obj.la += PI / 2;
		}
*/
	
		// agent behavior based on sampled sensor
		if (s2 < s1 && s2 < s3) {
			// turn left or right randomly
			//obj.la += random(PI / 2, -PI / 2);
			// paper
			obj.la += (random() > 0.5 ? PI / 2 : -PI / 2);
		} else if (s1 < s3) {
			// turn left
			obj.la -= PI / 2;
		} else if (s3 < s1) {
			// turn right
			obj.la += PI / 2;
		}
		
		obj.lx += obj.lv * sin(obj.la);
		obj.ly += obj.lv * cos(obj.la);
		
		// boundary checks
		obj.lx = obj.lx < 0 ? obj.lx + width - 1 : obj.lx;
		obj.lx %= width;
		obj.ly = obj.ly < 0 ? obj.ly + height - 1 : obj.ly;
		obj.ly %= height;
		
		// deposit diffusion (3x3 mean kernel)
		// should probably go after deposit step though
		var i = parseInt(obj.lx + obj.ly * width);
		var b = trail_map[i] / 2;

		var lx = parseInt(obj.lx);
		var ly = parseInt(obj.ly);

		var xb = (lx - 1);
		var yb = (ly - 1);
		var xbl = xb < 0 ? width - 1 : xb;
		var ybl = yb < 0 ? height - 1 : yb;
		var xbu = (lx + 1) % width;
		var ybu = (ly + 1) % height;
		/*
		var v1 = trail_map[xbl + ly * width];
		var v2 = trail_map[xbu + ly * width];
		var v3 = trail_map[xbl + ybl * width];
		var v4 = trail_map[xbl + ybu * width];
		var v5 = trail_map[xbu + ybl * width];
		var v6 = trail_map[xbu + ybu * width];
		var v7 = trail_map[lx + ybl * width];
		var v8 = trail_map[lx + ybu * width];
		
		var vm = (v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8) / 8 / 5;
		*/
		trail_map[xbl + ly * width] = b;
		trail_map[xbu + ly * width] = b;
		trail_map[xbl + ybl * width] = b;
		trail_map[xbl + ybu * width] = b;
		trail_map[xbu + ybl * width] = b;
		trail_map[xbu + ybu * width] = b;
		trail_map[lx + ybl * width] = b;
		trail_map[lx + ybu * width] = b;
		
		// deposit
		trail_map[i] = obj.d;
		
		// agent display
		var pa1 = 0.75, pa2 = 0.75, pa3 = 0.75;
		var pb1 = 0.5, pb2 = 0.5, pb3 = 0.5;
		var pc1 = 1, pc2 = 1, pc3 = 0.5;

		var pdr = 0.7;
		var pdg = 0.8;
		var pdb = 0.3;

		var pt = noise(obj.la / 2 + xmotion + n);
		 
		var ll = 1000;

		var rf = pal(pt, pa1, pb1, pc1, pdr) * 255;
		var gf = pal(pt, pa2, pb2, pc2, pdg) * 255;
		var bf = pal(pt, pa3, pb3, pc3, pdb) * 255;
		
		fill(rf, gf, bf, 255 * (1 - min(ll, frameCount) / ll));
		stroke(rf, gf, bf, 255 * (min(ll, frameCount) / ll));
		ellipse(obj.lx, obj.ly, 1, 1);
		
/*
		if (trail_map[parseInt(i)] > 1) {
			trail_map[parseInt(i)] = 1;
		}
*/
	 }
	}
	
	// deposit decay
	for (var y = 0; y < height; y += 1) {
		for (var x = 0; x < width; x += 1) {
			var v = trail_map[x + y * width];
			trail_map[x + y * width] -= 0.1;
			if (trail_map[x + y * width] < 0) {
				trail_map[x + y * width] = 0;
			}
		}
	}
/*
	if (frameCount % 60 == 0) {
		var st = 1 + parseInt(random() * (nn / 8));
		for (var y = 0; y < nn; y += st) {
			objs[y].lx = random() * width;
			objs[y].ly = random() * height;
		}
	}
*/
}

function draw() {
	noStroke();
	
	rectMode(CORNER);
/*
	fill(0, 0, 0, 8);
	rect(0, 0, width, height);
*/
	rectMode(CENTER);
	
	compute();
	
	xmotion += 0.005;
	ymotion += 0.0002;
}