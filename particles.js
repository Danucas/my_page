class Particle {
	constructor(color, maxSize, speed) {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * maxSize + 1;
		this.color = color;
		this.weight = 10;
		this.speedX = Math.random() * speed - (speed/2);
		this.speedY = Math.random() * speed - (speed/2);
	}
	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
		ctx.fill();
	}
	update() {
		if (this.size > 0.2) this.size -= 0.001;
		this.x += this.speedX;
		this.y += this.speedY;
	}
}