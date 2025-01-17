// same as parallax checkerboard with static render goal

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	var context = drawingContext
	context.shadowOffsetX = random(-4, 4);
	context.shadowOffsetY = random(-4, 4);
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "white";
	
	rectMode(CENTER);
}

let xmotion = 0;
let ymotion = 0;
let r = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	
	if (frameCount % round(64 + 64 * random()) == 0) {
		xmotion = random() * 256;
		ymotion = random() * 256;
		r = random() * PI * 2;
	}
	
	let planes = 4;

	let sw = 100;
	let sh = 100;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = abs(0.5 - np) * 2;
		
		let sf = pow(1, ainp);
		
		push();
		translate(width / 2, height / 2);
		scale(sf - pow(xmotion/128, 4), sf - pow(xmotion/128, 4));
		// slow
		rotate(r);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					let no = noise(nx * 0.5, ny * 0.5) * noise(ainp * 2);
					
					let ss = abs(sin((nx * ny) * PI * 2 + inp * PI * 2 + xmotion / 30)) * 2;
					
					stroke((140 + (1 - np) * 180 * sf + no * 140) % 360, 128 * sf, 192 * np, sf / 2.75);
					strokeWeight(1.25);
					fill(0, 0, 0, sf);
					
					let vw = sw * ss;
					let vh = sh * ss;
					
					if (vw > 0 && vh > 0) {
						if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + (x + abs(cos(ainp * PI * 2 + xmotion / 4 * nx + nx * PI * 2)) * 2 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ainp * PI * 2 + ymotion / 4 * ny + ny * PI * 2)) * 2 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						} else {
							ellipse(-width / 2 + (x + abs(cos(ainp * PI * 2 + xmotion / 4 * nx + nx * PI * 2)) * 2 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ainp * PI * 2 + ymotion / 4 * ny + ny * PI * 2)) * 2 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						}
					}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.25;
}