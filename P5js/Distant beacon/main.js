function setup() {
	createCanvas(windowWidth, windowHeight);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generate();
}

function draw() {
	
}

function generate() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	
	for (y = -128; y < height + height; y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width / 2; x += 4) {			
			if (random() > 0.3) {
				let yy = y * 0.8;

				let nox0 = x / width;
				let nx = abs(0.5 - nox0) * 2;
				let nox = noise(nx * 8, ny * 8);
				let nox2 = (0.5 - noise(nx, ny)) * 2;
				let nox3 = noise(nx * 2, ny * 2);
				let n = (sin(nx * PI * 0.5 + ny * PI * 2 + nox * PI * 10));
				
				let xx = x + random(-2, 2) + width / 2;
				let yh2 = (width / 48) * nox2 * pow(ny, 0.7);
				noStroke();

				stroke(210 + abs(nox2) * 8, 32 + 64 * abs(nox2), 160 - 110 * nx + 90 * abs(n), 0.08 * abs(n) * pow(ny / 2, 0.8) + 0.5 * pow(nx / 2.1, 4));
				line(xx, height - yy, xx + nox2 * (width / 32) * (1 - ny) * 2, height - yy - yh2);
				line(width - xx, height - yy, width - (xx + nox2 * (width / 32) * (1 - ny) * 5), height - (yy + yh2));
			}
		}
	}
	
	let cx = width / 2;
	let cy = height / 2.5;
	let rr = height * 8;
	
	strokeWeight(1);
	for (y = 0; y < 10000; y += 1) {
		let cyy = y / 10000;
		let cccx = cx + sin(cyy * PI * 2) * (rr / 2.05);
		stroke(random(50, 60), random(128, 200), 255, 0.05);
		line(cccx + random(-cx, cx) / 16, cy + random(-cx, cx) / 16 - rr / 2.5 + cos(cyy * PI * 2) * (rr / 1.85), cx, cy / 2);
	}
	/*
	rr = height / 64;
	for (y = 0; y < 100; y += 1) {
		let cyy = y / 100;
		let cccx = cx + sin(cyy * PI * 2) * (rr / 2.05);
		stroke(random(50, 60), random(128, 200), random(230, 255), 0.5);
		line(cccx + random(-cx, cx), cy + random(-cx, cx) - rr / 2.5 + cos(cyy * PI * 2) * (rr / 1.85), cx, cy / 2);
	}
	*/
	//noStroke();
	//fill(random(50, 60), 128, 255, 1);
	//ellipse(cx, cy - rr / 2.5, width / 48, height / 24);
}
