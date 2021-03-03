// toward smaller codesize

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
}

function draw() {
	let sx = frameCount/1024;
	let sy = frameCount/1024;
	
	let h2 = height / 2;

	push()
	translate(width / 2, height / 2);

	for (let y = -h2; y < h2; y += 1) {
		//let x = 0;

		const yy = y^h2;

		const t = yy | (frameCount / 32 + (sin(yy / height * PI * 32 * max(0, 1-frameCount/450)) * 255 * (1 - frameCount / 200)));
		const brightness = 255-(255 * (sin(frameCount/1300 * PI * 1.5)) - t % 255);
		fill(120 + t % 200, t % 255, brightness, 1);
	rotate(t / 20000 * max(0,1- frameCount/800));
/*
		if (brightness < 32 || brightness > 224) {
			continue;
		}
*/
		
		let yyy = y%t;
		
		rect(-width / 2 + width / 2 - (width / 2) * sx, -height / 2 + height / 2 + yyy * sy, 1, 1);
		rect(-width / 2 + width / 2 + (width / 2) * sx, -height / 2 + height / 2 + yyy * -sy, 1, 1);
		rect(-height / 2 + height / 2 + yyy * sy, -width / 2 + width / 2 + width / 2 * sx, 1, 1);
		rect(-height / 2 + height / 2 + yyy * -sy, -width / 2 + width / 2 - width / 2 * sx, 1, 1);
/*
		rect(width / 2 + (-width / 2 + x) * sx, height / 2 + y * sy, 1, 1);
		rect(width - (width / 2 + (-width / 2 + x) * sx), height / 2 + y * -sy, 1, 1);
		rect(height / 2 + y * sy, width - (width / 2 + (-width / 2 + x) * sx), 1, 1);
		rect(height / 2 + y * -sy, (width / 2 + (-width / 2 + x) * sx), 1, 1);
*/
	}
	pop();
}
