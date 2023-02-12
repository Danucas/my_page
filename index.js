const mouse = {
	x: undefined,
	y: undefined
}

const particleArray = [];
const COLORS = {
	track: 'rgba(4, 186, 174, 1)',
	clicks: 'rgba(255, 66, 129)'
}

const SKILLS_BADGE = {
	languages: {
        position: {
            x: 250,
            y: 102,
        },
        badges: [
            {
                name: 'Python',
                img: 'python.png',
                top: '123px',
                left: '237px',
                exp: 7
            },
            {
                name: 'Javascript',
                img: 'js.png',
                top: '125px',
                left: '39px',
                exp: 2
            },
            {
                name: 'C',
                img: 'c.png',
                top: '-43px',
                left: '140px',
                exp: 4
            }
        ]
    },
	databases: {
        position: {
            x: 420,
            y: 340
        },
        badges: [
            {
                name: 'Postgres',
                img: 'postgres.png',
                top: '110px',
                left: '300px',
                exp: 3
            },
            {
                name: 'Mysql',
                img: 'mysql.png',
                top: '236px',
                left: '411px',
                exp: 2
            },
            {
                name: 'MSSql',
                img: 'mssql.png',
                top: '236px',
                left: '186px',
                exp: 2
            },
            {
                name: 'MongoDB',
                img: 'mongodb.png',
                top: '348px',
                left: '300px',
                exp: 2
            },
            {
                name: 'Neo4j',
                img: 'neo4j.png',
                top: '348px',
                left: '300px',
                exp: 2
            },
            {
                name: 'Snowflake',
                img: 'snowflake.svg',
                top: '348px',
                left: '300px',
                exp: 2
            }
        ]
    },
    frameworks: {
        position: {
            x: 100,
            y: 520
        },
        badges: [
            {
                name: 'Django',
                img: 'django.png',
                top: '110px',
                left: '300px',
                exp: 3
            },
            {
                name: 'Github',
                img: 'github.png',
                top: '110px',
                left: '300px',
                exp: 5
            },
            {
                name: 'Nginx',
                img: 'nginx.png',
                top: '110px',
                left: '300px',
                exp: 3
            },
            {
                name: 'Flask',
                img: 'flask.png',
                top: '110px',
                left: '300px',
                exp: 4
            },
            {
                name: 'AWS',
                img: 'aws.png',
                top: '110px',
                left: '300px',
                exp: 2
            },
            {
                name: 'Linux',
                img: 'linux.png',
                top: '110px',
                left: '300px',
                exp: 7
            }
        ]
    }
}

function openSocialMedia(link) {
	window.open(link, '_blank');
}

async function sleep(millsecs) {
    return new Promise(resolve=>setTimeout(resolve, millsecs));
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
    }

    loadContent(view) {
        this.parent.loadContent(view);
    }

    render() {
        return (
            <div id="content_menu">
			    <ul>
				    <li onClick={()=>this.loadContent('about')}>About me</li>
				    <li onClick={()=>this.loadContent('portfolio')}>Portfolio</li>
			    </ul>
		    </div>
        )
    }
}

class About extends React.Component {
    constructor(props) {
        super(props);
        this.badgesContainerRef = React.createRef();
        this.state = {
            skills: null,
            sized: false
        }
    }

    renderSkills(badge) {
        let skills = badge ? SKILLS_BADGE[badge].badges : null;

        if (skills) {
            const angle = ((Math.PI * 2) / skills.length);
            let sumAngle = 0;
            for (let skill of skills) {
                let origin = {...SKILLS_BADGE[badge].position};
                let p = {...SKILLS_BADGE[badge].position};
                let distance = window.screen.width <= 900 ? 100 : 130;
                p.y = p.y - distance;
                let rx = Math.cos(sumAngle) * (p.x - origin.x) -(Math.sin(sumAngle)) * (p.y - origin.y) + origin.x;
                let ry = Math.sin(sumAngle) * (p.x - origin.x) +Math.cos(sumAngle) * (p.y - origin.y) + origin.y;
                sumAngle = sumAngle + angle;
                skill.left = rx;
                skill.top = ry;
            };
        }
        this.setState(()=>({skills: skills}))
    }

    async loadDimensions() {
        await sleep(600);
        if (!this.state.sized) {
            const container = this.badgesContainerRef.current;

            if(window.screen.width <= 900){
                console.log('mobile render')
                const dimensions = container.getBoundingClientRect();
                SKILLS_BADGE.languages.position.x = (dimensions.width / 2) - 20;
                SKILLS_BADGE.languages.position.y = ((dimensions.height / 4) * 1) - 50;

                SKILLS_BADGE.databases.position.x = (dimensions.width / 2) - 20;
                SKILLS_BADGE.databases.position.y = ((dimensions.height / 4) * 2) - 50;

                SKILLS_BADGE.frameworks.position.x = (dimensions.width / 2) - 20;
                SKILLS_BADGE.frameworks.position.y = ((dimensions.height / 4) * 3) - 50;
            } else {
                console.log('desktop render')
                console.log(window.screen.width)
                const dimensions = container.getBoundingClientRect();
                SKILLS_BADGE.languages.position.x = ((dimensions.width / 4) * 2) - 20;
                SKILLS_BADGE.languages.position.y = (dimensions.height / 5) * 1;

                SKILLS_BADGE.databases.position.x = ((dimensions.width / 4) * 3) - 20;
                SKILLS_BADGE.databases.position.y = (dimensions.height / 5) * 2;

                SKILLS_BADGE.frameworks.position.x = ((dimensions.width / 4) * 1) - 20;
                SKILLS_BADGE.frameworks.position.y = (dimensions.height / 5) * 3;
            }

            this.setState((p)=> ({sized: true}));

        }
    }

    render() {
        this.loadDimensions();
        let skills;
        if (this.state.skills) {
            skills = this.state.skills.map((badge) => {

                const img = `url(/my_page/skill_badges/${badge.img})`;
                // const img = `url(/skill_badges/${badge.img})`;
                return (<div key={badge.name} className="child tooltip" style={{
                    top: badge.top,
                    left: badge.left,
                    backgroundImage: img
                }}><h1>{badge.name}</h1><span className="tooltiptext">Exp: {badge.exp} years</span></div>)
            });
        }
        return (
            <>
                <div className="about">
                    <div className="profile-description">
                        <h2>About me</h2>
                        <img src="profile.jpeg"/>
                        <p>I'm a Full-Stack Software Engineer based on Cali, Colombia.
                            <br></br>
                            <br></br>
                            My Goal is to deliver the best solutions for every day requirements.
                            <br></br>
                            <br></br>
                            I've been working with ETL processes as <span className="accent">DataEngineer</span>
                            <br></br>
                            Contributions to the <span className="accent">OpenSource community</span>
                            <br></br>
                            And some fun with GPT-3 and Stable diffusion.
                            <br></br>
                            My Values:
                        </p>
                        <div className="soft-skills-container">
                            <h1 className="soft-skill">Team work</h1>
                            <h1 className="soft-skill">Creativity</h1>
                            <h1 className="soft-skill">Attention to detail</h1>
                            <h1 className="soft-skill">Flexibility</h1>
                            <h1 className="soft-skill">Problem Solving</h1>
                            <h1 className="soft-skill">Work ethic</h1>
                        </div>
                        <button className="resume">View Resume</button>
                    </div>
                    <div ref={this.badgesContainerRef} id="skill-badges" className="skill-badges">
                        <div id="languages" className="cluster" style={
                            {
                                top: SKILLS_BADGE.languages.position.y - 20,
                                left: SKILLS_BADGE.languages.position.x - 20,
                            }
                        } onMouseEnter={(e)=>this.renderSkills('languages')} onMouseLeave={(e)=>this.renderSkills('languages')}>
                            Languages
                        </div>
                        <div className="cluster" style={
                            {
                                top: SKILLS_BADGE.databases.position.y - 20,
                                left: SKILLS_BADGE.databases.position.x - 20,
                            }
                        } onMouseEnter={()=>this.renderSkills('databases')}>
                            Databases
                        </div>
                        <div className="cluster" style={
                            {
                                top: SKILLS_BADGE.frameworks.position.y - 20,
                                left: SKILLS_BADGE.frameworks.position.x - 20,
                            }
                        } onMouseEnter={()=>this.renderSkills('frameworks')}>
                            Frameworks & Tools
                        </div>
                        {skills}
                    </div>
                </div>
                <WelcomeHeader navBar={true}/>
            </>
        )
    }
}


class WelcomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: props.navBar
        }
    }
    render() {
        let className = this.state.navBar ? "nav-bar" : "head-name";
        let containerClass = this.state.navBar ? "head-nav-bar" : "head-container";
        let socialMediaClass = this.state.navBar ? "social-media-nav-bar" : "social-media";
        return (
            <div className={containerClass}>
                <div className={className}>
                    <h1>Hello, I'm <span style={{color: "#9c7ee2"}}>Daniel Rodriguez.</span>
                    <br></br>Software Engineer</h1>
                    {this.state.navBar && (
                        <p>dnart.tech@gmail.com</p>
                    )}
                </div>
                <div className={socialMediaClass}>
                    <button style={
                        {
                            filter: "invert()",
                            backgroundImage: "url(linkedin.png)"
                        }
                    }
                            onClick={(e)=> openSocialMedia('https://www.linkedin.com/in/Danucas/')}></button>
                    <button style={
                        {
                            filter: "invert()",
                            backgroundImage: "url(github_logo.png)"
                        }
                    }
                            onClick={(e)=> openSocialMedia('https://github.com/Danucas/')}></button>
                    <button style={
                        {
                            filter: "invert()",
                            backgroundImage: "url(twitter.png)"
                        }
                    }
                            onClick={(e)=> openSocialMedia('https://twitter.com/Danucas1')}></button>
                </div>
            </div>
        )
    }
}


const VIEWS = {
    'home': <WelcomeHeader/>,
    'about': <About/>,
    'portfolio': <WelcomeHeader/>,
    'contact': <WelcomeHeader/>
}


class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: <WelcomeHeader/>,
            context: null
        };
        this.canvasRef = React.createRef();
    }

    loadContent(view) {
        this.setState(()=>({content: VIEWS[view]}));
    }

    async animate(ctx) {
        const canvas = this.canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.handleParticles(ctx);
        requestAnimationFrame(()=> {
            this.animate(ctx);
        });
    }

    handleParticles(ctx) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            particleArray[i].draw(ctx);
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

    async getContext() {
        await sleep(1200);
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.setState(()=>({context: ctx}));

        window.addEventListener('mousemove', (evn) => {
            mouse.x = evn.x;
            mouse.y = evn.y;
            for (let i = 0; i < 1; i++) {
                particleArray.push(new Particle(COLORS.track, 5, 4));
            }
        });

        window.addEventListener('touchmove', (evn) => {
            mouse.x = evn.touches[0].clientX;
            mouse.y = evn.touches[0].clientY;
            for (let i = 0; i < 1; i++) {
                particleArray.push(new Particle(COLORS.track, 5, 4));
            }
        });

        window.addEventListener('click', (evn) => {
            mouse.x = evn.x;
            mouse.y = evn.y;
            for (let i = 0; i < 10; i++) {
                particleArray.push(new Particle(COLORS.clicks, 9, 12));
            }
        });
    }

    render() {
        if (this.state.context) {
            this.animate(this.state.context);
        } else {
            this.getContext();
        }

        return <div>
            <canvas id="background_canvas" ref={this.canvasRef}></canvas>
            <Menu parent={this}/>
            {this.state.content}
        </div>
    }
}

async function start() {
    await sleep(600);
    ReactDOM.render(<MainApp/>, document.getElementById('container'));
}

start();
