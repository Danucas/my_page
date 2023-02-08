async function startHeadAnimation() {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const canvas = document.getElementsByClassName('head_canvas')[0];
	const context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.strokeStyle = 'white';
	context.strokeWidth = '0.2';
	const particles = []
	for (let i = 0; i < 200; i++) {
		var maxX = screen.width + 200;
    	var maxY = screen.height + 200;
		var randomX = Math.floor(Math.random() * (+maxX + 1 - 100)) + -200;
		var randomY = Math.floor(Math.random() * (+maxX + 1 - 200)) + -200;
		const randomW = Math.floor(Math.random() * (+2 + 1 - 1)) + 1;
		var direction = Math.floor(Math.random() * (+3 + 1 - +0)) + +0;
		particles.push([randomX, randomY, randomW]);
		context.beginPath();
		context.arc(randomX, randomY, 1, 0, 2 * Math.PI);
		// context.rect(randomX, randomY, 1, 1);
		context.fill();
		context.closePath();
	}
	const centerX = (screen.width / 2);
	const centerY = (screen.height / 2);
	while (true) {
		await sleep(16);
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < particles.length; i++) {
			const oldX = particles[i][0];
			const oldY = particles[i][1];
			const wid = particles[i][2]
			const rad = 0.0015708;
			const newX = centerX + (oldX - centerX) * Math.cos(rad) - (oldY - centerY) * Math.sin(rad);
			const newY = centerY + (oldX - centerX) * Math.sin(rad) + (oldY - centerY) * Math.cos(rad);
			context.beginPath();
			context.arc(newX, newY, wid, 0, 2 * Math.PI);
			// context.rect(newX, newY, 10, 10);
			context.fill();
			particles[i][0] = newX;
			particles[i][1] = newY;
			context.closePath();
		}
	}
}
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
function tracker(evn) {
	const cont = document.getElementsByClassName('container')[0];
	// console.log(evn.pageX, evn.pageY);
	const height = cont.offsetHeight;
	const yOffset = Math.round((evn.pageY * 100) / height);
	// console.log(yOffset);
	let radius = Math.round(((screen.width / 2) * yOffset) / 100);
	if (evn.pageY < 600) {
		radius += 80;
	}
	if (yOffset > 1) {
		cont.style.clipPath = `circle(${radius}px at ${evn.pageX}px ${evn.pageY}px)`;
	}	
}

/* window.onload = async function() {
	// Controls the focus effect
	const cont = document.getElementsByClassName('container')[0];
	const canvas = document.getElementsByClassName('head_canvas')[0];
	const head_cont = document.getElementsByClassName('head_cont')[0];
	const features = document.getElementsByClassName('features')[0];
	features.style.marginTop = screen.height;
	head_cont.style.height = screen.height;
	canvas.style.height = screen.height;
	canvas.height = screen.height;
	canvas.width = screen.width;

	if (detectMob() === false) {
		const cont = document.getElementsByClassName('container')[0];
		cont.style.clipPath = `circle(${20}px at ${0}px ${0}px)`;
		window.addEventListener('mousemove', tracker);
	}
	window.addEventListener('scroll', function (evn) {
		// console.log(evn);
		const soMedia = document.getElementsByClassName('social_media')[0];
		const name = document.getElementsByClassName('name')[0];
		const height = screen.height;
		soMedia.style.top = (window.scrollY) + 'px';
		if (window.scrollY > height - 80) {
			name.style.display = 'flex';
			name.style.top = (window.scrollY) + 'px';
		} else {
			name.style.display = 'none';
		}
		
	});
	const playBtn = document.querySelector('[presentation=play]');
	const audio = new Audio('presentation.wav');
	playBtn.addEventListener('click', function () {
		audio.play();
	})
	// Resume
	const resBtn = document.querySelector("button[class=resume]");
	resBtn.addEventListener('click', async function () {
		window.open('Daniel_Rodriguez_Resume.pdf', '_blank')
	});
	startHeadAnimation();
	let hidden = true;
	// reveal hide 
	const revealHideBtn = document.querySelector('.name button');
	revealHideBtn.addEventListener('click', function (evn) {
		if (hidden) {
			window.removeEventListener('mousemove', tracker);
			cont.style.clipPath = '';
			revealHideBtn.innerHTML = 'HIDDE';
			hidden = false;
		} else {
			window.addEventListener('mousemove', tracker);
			revealHideBtn.innerHTML = 'REVEAL';
			cont.style.clipPath = `circle(${400}px at ${300}px ${0}px)`;
			hidden = true;
		}
	});
}*/

function openSocialMedia(link) {
	window.open(link, '_blank');
} 


// Animation Section
const canvas = document.getElementById('background_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
const COLORS = {
	track: 'rgba(4, 186, 174, 1)',
	clicks: 'rgba(255, 66, 129)'
}

const mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', (evn) => {
	// console.log(evn);
	mouse.x = evn.x;
	mouse.y = evn.y;
	for (let i = 0; i < 1; i++) {
		particleArray.push(new Particle(COLORS.track, 5, 4));
	}
});

window.addEventListener('click', (evn) => {
	// console.log(evn);
	mouse.x = evn.x;
	mouse.y = evn.y;
	for (let i = 0; i < 10; i++) {
		particleArray.push(new Particle(COLORS.clicks, 9, 12));
	}
});

window.addEventListener('resize', (evn)=> {
	canvas.width = evn.target.innerWidth;
	canvas.height = evn.target.innerHeight;
});

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
	draw() {
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

function handleParticles() {
	ctx.lineWidth = 0.5;
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
		particleArray[i].draw();
		for (let j = i; j < particleArray.length; j++) {
			const dx = particleArray[i].x - particleArray[j].x;
			const dy = particleArray[i].y - particleArray[j].y;
			const distance = Math.sqrt(dx ** 2 + dy ** 2);
			if (distance < 40) {
				ctx.strokeStyle = particleArray[i].color;
				ctx.beginPath()
				ctx.moveTo(particleArray[i].x, particleArray[i].y);
				ctx.lineTo(particleArray[j].x, particleArray[j].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
		if (particleArray[i].size <= 0.3) {
			particleArray.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	requestAnimationFrame(animate);
}

animate();


// Animation Section End


class Slider {
	constructor() {
		const context = this;
		console.log(document.querySelectorAll('#content_menu li'));
		this.tabs = {
			home: {
				container: document.getElementById('head_container'),
			},
			about: {
				container: document.getElementById('about'),
				canvas: document.getElementById('skills_canvas'),
				canvasContext: undefined,
			},
			portfolio: {
				container: document.getElementById('portfolio'),
			},
			contact: {
				container: document.getElementById('contact'),
			}
		}
		this.menu = {
			items: {
				home: document.querySelectorAll('#content_menu li')[0],
				about: document.querySelectorAll('#content_menu li')[1],
				portfolio: document.querySelectorAll('#content_menu li')[2],
				contact: document.querySelectorAll('#content_menu li')[3]
			},
			container: document.getElementById('content_menu').querySelector('ul')
		}
		console.log(this.menu);
		for (let item in this.menu.items) {
			console.log(item);
			this.menu.items[item].addEventListener('click', (evn) => {
				context.openTab(item)
			});
		}
	}
	async openTab(tabKey) {
		console.log(tabKey);
		for (let tab in this.tabs) {
			this.tabs[tab].container.style.display = 'none';
		}
		this.tabs[tabKey].container.style.display = 'block';

		if (tabKey == 'about') {
			const marginleft = Number(window.getComputedStyle(this.tabs.about.canvas).marginLeft.split('px')[0]);
			this.tabs.about.canvas.width = this.tabs.about.canvas.getBoundingClientRect().width - marginleft;
			this.tabs.about.canvas.height = this.tabs.about.canvas.getBoundingClientRect().height;
			const res = await (await fetch('/skill_badges/')).text();
			const regexp = /<script.+?</ig;
			let match, files = [];
			let counter = 0;
			while ((match = regexp.exec(res)) != null && counter < 100) {
				files.push(match.index);
				counter++;
			}
			let badges = [];
			for (let i = 3;  i < files.length; i++) {
				let start = files[i];
				let end = i == files.length - 1 ? res.length - 1 : files[i + 1];
				const fileName = res.substring(start, end).split('"')[1];
				badges.push(new SkillBadge(badges, this.tabs.about.canvas, fileName, this));
			}
			this.tabs.about.badges = badges;
			if (this.tabs[tabKey].canvasContext == undefined) {
				this.tabs[tabKey].canvasContext = this.tabs[tabKey].canvas.getContext('2d');
				this.animateSkills();
			}
		}
	}
	async animateSkills() {
		this.tabs.about.canvasContext.fillStyle = "rgba(0, 0, 0, 0.1)";
		this.tabs.about.canvasContext.fillRect(0, 0, this.tabs.about.canvas.width, this.tabs.about.canvas.height);
		for (let badge of this.tabs.about.badges) {
			badge.update();
			badge.draw();
		}
		requestAnimationFrame(this.animateSkills.bind(this));
	}
}

class RotatingParticle {
	constructor(origin) {
		this.origin = origin;
		this.x = this.origin.x + (Math.random() * 50 - 25);
		this.y = this.origin.y + (Math.random() * 50 - 25);
		const dx = this.origin.x - this.x;
		const dy = this.origin.y - this.y;
		this.hip = Math.sqrt(dx ** 2 + dy ** 2);
		this.size = Math.random() * 2;
		this.speed = 0.01;
		this.angle = 0;
	}
	update() {
		this.angle += this.speed;
		if (this.angle > Math.PI * 2) {
			this.angle = 0;
		}
		this.rx = Math.cos(this.angle) * (this.x - this.origin.x) -(Math.sin(this.angle)) * (this.y - this.origin.y) + this.origin.x;
		this.ry = Math.sin(this.angle) * (this.x - this.origin.x) +Math.cos(this.angle) * (this.y - this.origin.y) + this.origin.y;
	}
	draw() {
		const context = this.origin.parentContext.tabs.about.canvasContext;
		context.beginPath();
		context.arc(this.rx, this.ry, this.size, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}
	connectParticles() {
		for (let badge of this.origin.parentContext.tabs.about.badges) {
			if (this.origin.index != badge.index) {
				for (let particle of badge.particles) {
					const dx = particle.rx - this.rx;
					const dy = particle.ry - this.ry;
					const distance = Math.sqrt(dx ** 2 + dy ** 2);
					if (distance < 50) {
						const context = this.origin.parentContext.tabs.about.canvasContext;
						context.strokeStyle = 'white';
						context.lineWidth = 0.2;
						context.beginPath();
						context.moveTo(this.rx, this.ry);
						context.lineTo(particle.rx, particle.ry);
						context.stroke();
						context.closePath();
						break;
					}
				}
			}
		}
	}
}

function findNearest(positions, x, y) {
	let near = 1000;
	for (let position of positions) {
		const dx = position.x - x;
		const dy = position.y - y;
		const distance = Math.sqrt(dx ** 2 + dy ** 2);
		if (distance < near) {
			near = distance;
		}
	}
	return near;
}

let MAX_DEFINE_NEAREST_CALLS = 100;
let defineNearestPositionsCallCount = 0;

function defineNearestPosition(existingPositions, width, height) {
	// console.log('define nearest', existingPositions);
	let MAX_TRIES = 300;
	for (let tries=0; tries < MAX_TRIES; tries++) {
		const newX = Math.random() * (width * 0.75) + width * 0.125;
		const newY = Math.random() * (height * 0.75) + height * 0.125;;
		let nearest = findNearest(existingPositions, newX, newY);
		if (nearest > 50) {
			console.log(newX, newY);
			return [newX, newY];
		}
	}
	if (MAX_DEFINE_NEAREST_CALLS > defineNearestPositionsCallCount) {
		defineNearestPositionsCallCount++;
		return defineNearestPosition(existingPositions, width, height);
	}
}

class SkillBadge {
	x
	y
	constructor(previous_badges, canvas, badgeFile, parentContext) {
		this.index = previous_badges.length;
		this.size = 30;
		if (previous_badges.length == 0) {
			this.x = Math.random() * (canvas.width * 0.75) + canvas.width * 0.125;
			this.y = Math.random() * (canvas.height * 0.75) + canvas.height * 0.125;
		} else {
			[this.x, this.y] = defineNearestPosition(previous_badges, canvas.width, canvas.height);
		}
		this.fileName = badgeFile;
		this.parentContext = parentContext;
		this.speedX = Math.random() * 2 - 1;
		this.speedY = Math.random() * 2 - 1;
		this.image = new Image();
		this.image.src = `/skill_badges/${this.fileName}`;
		this.particles = [];
		for (let i = 0; i < Math.random() * 8; i++) {
			this.particles.push(new RotatingParticle(this));
		}
	}
	update() {
		// this.x += this.speedX;
		// this.y += this.speedY;
		// if (this.x > this.parentContext.tabs.about.canvas.width - (this.size / 2) || this.x < this.size / 2) {
		// 	this.speedX *= -1;
		// }
		// if (this.y > this.parentContext.tabs.about.canvas.height - (this.size / 2) || this.y < this.size / 2) {
		// 	this.speedY *= -1;
		// }
	}
	draw() {
		// console.log(this);
		const cctx = this.parentContext.tabs.about.canvasContext;
		cctx.fillStyle = '#ffffff';
		cctx.beginPath();
		cctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		cctx.fill();
		cctx.closePath();
		// cctx.drawImage(this.image, this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
		for (let particle of this.particles) {
			particle.update();
			particle.draw();
			// particle.connectParticles();
		}
	}
}

const slider = new Slider();