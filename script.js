document.addEventListener('DOMContentLoaded', () => {

    // Theme Switching

    const themeBtns = document.querySelectorAll('.theme-btn');

    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';

    const particleSound = document.getElementById('particle-sound');

    const colorPicker = document.getElementById('particle-color');

    const applyColorBtn = document.getElementById('apply-color');

    const partyBtn = document.getElementById('party-btn');

    const particleContainer = document.getElementById('particles');

    

    let customColor = '#ff0000';

    let particles = [];

    let mouseX = 0;

    let mouseY = 0;


    // Apply saved theme

    body.classList.add(savedTheme);


    // Theme button clicks

    themeBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const theme = btn.dataset.theme;

            body.className = '';

            body.classList.add(theme);

            localStorage.setItem('theme', theme);

        });

    });


    // Color picker

    applyColorBtn.addEventListener('click', () => {

        customColor = colorPicker.value;

    });


    // Mouse tracking

    document.addEventListener('mousemove', (e) => {

        mouseX = e.clientX;

        mouseY = e.clientY;

    });


    // Particle system

    function createParticles() {

        particleSound.currentTime = 0;

        particleSound.play();

        

        particleContainer.innerHTML = '';

        particles = [];


        for (let i = 0; i < 50; i++) {

            const particle = document.createElement('div');

            particle.classList.add('particle');

            

            const x = Math.random() * window.innerWidth;

            const y = Math.random() * window.innerHeight;

            

            particle.style.left = `${x}px`;

            particle.style.top = `${y}px`;

            particle.style.background = customColor;

            

            particleContainer.appendChild(particle);

            particles.push({

                element: particle,

                x, y,

                speedX: Math.random() * 4 - 2,

                speedY: Math.random() * 4 - 2

            });

        }

    }


    function animateParticles() {

        particles.forEach(particle => {

            const dx = mouseX - particle.x;

            const dy = mouseY - particle.y;

            

            particle.x += dx * 0.01 + particle.speedX;

            particle.y += dy * 0.01 + particle.speedY;

            

            particle.element.style.left = `${particle.x}px`;

            particle.element.style.top = `${particle.y}px`;

        });

        

        requestAnimationFrame(animateParticles);

    }


    partyBtn.addEventListener('click', () => {

        createParticles();

        animateParticles();

    });

});