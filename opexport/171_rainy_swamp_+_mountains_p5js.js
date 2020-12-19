// first rainy / foggy swamp then falling sand, once all sand is down draw rain / fog again
// idea from : https://twitter.com/eisism/status/1249856918627053568

function setup() {
	createCanvas(800, 800);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generate();
}

let f = [];
let finish = false;

function draw() {
	let c = 0;
if (finish == false) {
	loadPixels();
	for (let j = 0; j < 2; j += 1) {
		let d = pixelDensity();
		let l = 4 * (width * d) * (height * d);
		
		for (let j = 0; j < width * height; j += 1) {
			f[j] = 0;
		}
		
		for (let y = height; y >= 0; y -= 1) {
			for (let x = 0; x < width; x += 1) {
				let i = x * 4 + y * width * 4;
				let b = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
				let di = i + width * d * 4;
				let b2 = (pixels[di] + pixels[di + 1] + pixels[di + 2]) / 3;
				let b3 = (pixels[di + 4] + pixels[di + 4 + 1] + pixels[di + 4 + 2]) / 3;
				let b4 = (pixels[di - 4] + pixels[di - 4 + 1] + pixels[di - 4 + 2]) / 3;
				
				if (b < 255 && b2 > 224) {
					//let r = pixels[di];
					//let g = pixels[di + 1];
					//let b = pixels[di + 2];
					
					pixels[di] = pixels[i];
					pixels[di + 1] = pixels[i + 1];
					pixels[di + 2] = pixels[i + 2];
					//pixels[di + 3] = pixels[i + 3];
					pixels[i] = 255;
					pixels[i + 1] = 255;
					pixels[i + 2] = 255;
					
					f[x + width * y] = 1;
					
					c += 1;
				} else if (b < 255 && (b3 > 254 || b4 > 254) && b2 < 255 && f[x + width * y] == 0) {
					let r;
					let g;
					let b;
					if (b3 > 254) {
						//r = pixels[i];
						//g = pixels[i + 1];
						//b = pixels[i + 2];
						pixels[di + 4] = pixels[i];
						pixels[di + 4 + 1] = pixels[i + 1];
						pixels[di + 4 + 2] = pixels[i + 2];
						
						c += 1;
					} else if (b4 > 254) {
						//r = pixels[i];
						//g = pixels[i + 1];
						//b = pixels[i + 2];
						pixels[di - 4] = pixels[i];
						pixels[di - 4 + 1] = pixels[i + 1];
						pixels[di - 4 + 2] = pixels[i + 2];
						
						c += 1;
					}
					//pixels[i + 4 + 3] = pixels[i + 3];
					pixels[i] = 255;
					pixels[i + 1] = 255;
					pixels[i + 2] = 255;
					//pixels[i + 3] = 0;
				}
			}
		}
	}
	updatePixels();
}
	if (c == 0 && finish == false) {
		let x = 0, y = 0;
		for (y = 0; y < height / 2; y += 4) {
			let ny = y / height;
			for (x = 0; x < width; x += 4) {
				let nx = x / width;
				let n = noise(nx / 12, ny / 12);
				let n2 = noise(nx * 4, ny - 4);

				let yy = height - height / 24 + y - n * height;

				stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 170 + pow(ny, 1) * 68, 0.025);
				line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
			}
		}
		finish = true;
	}
}

function generate() {
	noStroke();
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 24, ny / 24);
			let n2 = noise(nx / 8, ny / 8);
			
			let yy = height / 3.9 + y - n * height;
			fill(60 - 30 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 2 + 0.25))), 0, 148 + pow(ny, 1) * 100, random(0.25, 0.75));
			stroke(0, 0, random(0, 128), random(0,0.025));
			ellipse(x + random(-8, 8), yy + random(-8, 8), 16, 16);
		}
	}
	
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 170 + pow(ny, 1) * 68, 1);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.85) {
				stroke(0, 0, 0, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-1, 1), y + random(-1, 1));
			}
		}
	}

	for (y = 0; y < height / 2; y += 2) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.05);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-200, 200), y + random(-1, 1));
			}
		}
	}
	
	//fill(0, 0, 0, 1);
	//rect(width / 2, height / 2 - height / 2.5 / 2 + 40, width / 10, height / 2.5);
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width; x += 1) {
			let yy = (height / 2 + noise(x / width) * 8) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			
			if (random() > 0.15) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-200, 200) * n * ny;
				noStroke();
				
				if (random() > 0.996 && n > 0.05) {
					fill(64, 64, 48, 1);
					rect(xx, yy - yh2, random(2, 8) * ny, 48 * ny);
				}
				
				stroke(128 + (nox2) * 8, 100 * nox3, (200*nox3-random(200) * n), random() * 0.45 * pow(ny, 0.3));
				line(xx, yy, xx + random(-200, 200) * n * noy * ny, yy + yh2);
			}
		}
	}
}