float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 8; x < width - 8; x += 4) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 8; y < height - 8; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 1 && brightness(p) < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(hue(p2) * 1.025, 128, 255, 12);
				
				ellipse(x + random(-8, 8), y + random(-8, 8), 4, 4);
			} else if (brightness(p) >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				float r = random(2, 48);
				
				fill(0, 0, 0, r);
				ellipse(x + sin(anorm_x * PI * 2 + ymotion) * 4, y + cos(anorm_y * PI * 2 + xmotion) * 4, r, r);
				//ellipse(y + cos(anorm_y * PI * 2 + xmotion) * 8, x + sin(anorm_x * PI * 2 + ymotion) * 8, r, r);
			}
		}
	}
	
	noStroke();
strokeWeight(2);
	for (int i = 2; i < 92; i += 1) {
		float norm_i = (float)(i - 2) / 14;
		noFill();
		stroke(64+(frameCount + 4) % 8 * 8, 128, 255, random(8, 24) * norm_i);
		triangle(width / 2, height / 2 - 800 + 64, width - (float)width / (i / 1.5), height / 2 + 256, (float)width / (i / 1.5), height / 2 + 256);
		line(width / 3.5 - i * 1.7, i * 6.1, width - width / 3.5 + i * 1.7, i * 6.1);
		line(width / 3.5 + i / 8, i / 12, width - width / 3.5 - i / 8, i / 12);
		
		//strokeCap(PROJECT);
		//stroke(0, 0, 0, 255);
		//strokeWeight(12);
		//fill(128+(frameCount + 4) % 8 * 8, 128, 255, 16 * norm_i);
		//rect(width / 6, height / 12, 128, 128);
		//fill(128+(frameCount + 1) % 8 * 8, 128, 255, 16 * norm_i);
		//rect(width - width / 6 - 128, height / 12, 128, 128);
		//noStroke();
	}
	stroke(64+(frameCount + 4) % 8 * 8, 128, 255, 16);
	noFill();
	
	triangle(width / 2, height / 2 - 800 + 64, 0, height / 2 + 256, width, height / 2 + 256);
	noStroke();
	fill(0, 0, 0, 64);
	triangle(width / 2, height / 2 - 800 + 64, width - width / 8, height / 2 + 290, width / 8, height / 2 + 256);
	
	fill(64+(frameCount + 4) % 8 * 8, 128, 255, 128);
	
	// h : square pattern
	//triangle(0, 0, 64, 0, 64, 64);
	//triangle(0, 0, 0, 64, 64, 64);
	
	float size = 64;

	triangle(width / 2 - 128, height / 2 - 22 + 32, width / 2 - 41, height / 2 - 22 + 32, width / 2 - 45, height / 2 + 22 + 32);
	triangle(width / 2 - 128, height / 2 - 22 + 32, width / 2 - 138, height / 2 + 22 + 32, width / 2 - 46, height / 2 + 22 + 32);
	triangle(width / 2 + 128, height / 2 - 22 + 32, width / 2 + 41, height / 2 - 22 + 32, width / 2 + 45, height / 2 + 22 + 32);
	triangle(width / 2 + 128, height / 2 - 22 + 32, width / 2 + 138, height / 2 + 22 + 32, width / 2 + 46, height / 2 + 22 + 32);
	triangle(width / 2 - 28, height / 2 - 128, width / 2 - 54, height / 2 + 128, width / 2 + 54, height / 2 + 128);
	triangle(width / 2 - 27, height / 2 - 128, width / 2 + 28, height / 2 - 128, width / 2 + 54, height / 2 + 128);
	
	xmotion += 0.1;
	ymotion += 0.4;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	fill(0, 0, 255, 255);
	
	//ellipse(width / 2, height / 2, 700, 700);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}