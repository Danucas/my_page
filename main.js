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

window.onload = async function() {
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
	// const content = cont.innerHTML;
	// const fakeContainer = document.getElementsByClassName('container')[1]
	// fakeContainer.innerHTML = content;
	// contents = fakeContainer.querySelectorAll('h1');
	// for (const el of contents) {
	// 	el.remove();
	// }
	// bubble focuser
	console.log(detectMob());
	if (detectMob() === false) {
		const cont = document.getElementsByClassName('container')[0];
		cont.style.clipPath = `circle(${20}px at ${0}px ${0}px)`;
		window.addEventListener('mousemove', function (evn) {
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
		});
	}
	window.addEventListener('scroll', function (evn) {
		// console.log(evn);
		const soMedia = document.getElementsByClassName('social_media')[0];
		const name = document.getElementsByClassName('name')[0];
		const height = screen.height;
		soMedia.style.top = (window.scrollY) + 'px';
		if (window.scrollY > height - 80) {
			name.style.display = 'block';
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
}
function openSocialMedia(link) {
	window.open(link, '_blank');
}