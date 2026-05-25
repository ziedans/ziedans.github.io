// Particles.js Config
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#e85d04" },
            shape: { type: "circle" },
            opacity: { value: 0.25, random: false },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: "#dc2f02", opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ['Lulusan SMK TKR', 'Mekanik Otomotif', 'Teknisi Kendaraan Ringan', 'Pekerja Keras & Teliti'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
let cursorScale = 1;

const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (cursor && follower && !isMobile) {
    function updateCursorPosition(e) {
        if (e.type === 'touchstart' || e.type === 'touchmove') {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        
        // Show cursor on first interaction
        cursor.classList.add('cursor-active');
        follower.classList.add('cursor-active');
        
        cursor.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
    }

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('touchstart', updateCursorPosition);
    document.addEventListener('touchmove', updateCursorPosition);

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        follower.classList.remove('cursor-active');
    });

    // Hide cursor when touch ends
    document.addEventListener('touchend', () => {
        cursor.classList.remove('cursor-active');
        follower.classList.remove('cursor-active');
    });

    function animateCursor() {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        follower.style.transform = `translate3d(${posX - 15}px, ${posY - 15}px, 0) scale(${cursorScale})`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
if (document.querySelector('.hero-content')) {
    gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

if (document.querySelector('.hero-visual')) {
    gsap.from('.hero-visual', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5
    });
}

// Section Titles Reveal
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    const title = section.querySelector('.section-title');
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
});

// About Page Content Reveal
if (document.querySelector('.about-content')) {
    gsap.from('.about-text', {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    gsap.from('.stat-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
}

// Hover effect for links and buttons
const interactables = document.querySelectorAll('a, button:not(.mobile-theme-toggle), .project-card, .skill-card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorScale = 1.8;
        if (follower) {
            follower.style.background = 'rgba(14, 165, 233, 0.15)';
            follower.style.borderColor = 'transparent';
        }
    });
    el.addEventListener('mouseleave', () => {
        cursorScale = 1;
        if (follower) {
            follower.style.background = 'transparent';
            follower.style.borderColor = 'var(--primary)';
        }
    });
});

// Project Cards Reveal
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 90%', // Trigger earlier
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all' // Clear styles after animation
    });
}

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        progressBar.style.width = scrollPercent * 100 + '%';
    }
});

// Theme Toggle
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('portfolio_theme');
if (currentTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

themeToggleBtns.forEach(themeToggleBtn => {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        
        let theme = 'light';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark';
        }
        
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
        
        localStorage.setItem('portfolio_theme', theme);
    });
});

// Start Typing
document.addEventListener('DOMContentLoaded', () => {
    type();
});

// --- Card Explosion Engine ---
function explodeCard(card, event) {
    // Allow clicking links in original content without exploding
    if (event.target.closest('a') || event.target.closest('button')) return;
    
    // If already exploded, do nothing
    if (card.classList.contains('exploded')) return;
    
    card.classList.add('exploded');
    
    const originalContent = card.querySelector('.original-content');
    const actionMenu = card.querySelector('.action-menu');
    
    // Get click coordinates relative to the viewport
    // If it was triggered by a keyboard or lack of coords, use card center
    let clickX = event.clientX;
    let clickY = event.clientY;
    
    if (!clickX || !clickY) {
        const rect = card.getBoundingClientRect();
        clickX = rect.left + rect.width / 2;
        clickY = rect.top + rect.height / 2;
    }
    
    // Create particles
    const particleCount = 40;
    const isDark = document.body.classList.contains('dark-theme');
    const colors = isDark ? 
        ['#ff6b1a', '#cc1a00', '#ffa500', '#3d1500'] : 
        ['#e85d04', '#dc2f02', '#f48c06', '#fff'];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(clickX, clickY, colors);
    }
    
    // Animate the card content hiding
    gsap.to(originalContent, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
            originalContent.style.visibility = 'hidden';
            actionMenu.style.display = 'flex';
            gsap.fromTo(actionMenu, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
            );
        }
    });
}

function createParticle(x, y, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);
    
    // Randomize particle appearance
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Randomize movement (circular burst)
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    gsap.to(particle, {
        x: tx,
        y: ty,
        opacity: 0,
        rotation: Math.random() * 360,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => {
            particle.remove();
        }
    });
}

function restoreCard(btn, event) {
    event.stopPropagation(); // Prevent triggering explodeCard again
    
    const card = btn.closest('.project-card');
    if (!card) return;
    
    const originalContent = card.querySelector('.original-content');
    const actionMenu = card.querySelector('.action-menu');
    
    gsap.to(actionMenu, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
            actionMenu.style.display = 'none';
            originalContent.style.visibility = 'visible';
            gsap.to(originalContent, { opacity: 1, scale: 1, duration: 0.3 });
            card.classList.remove('exploded');
        }
    });
}

// --- Project Slider & Auto-Scroll ---
const projectsGrid = document.querySelector('.projects-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicatorsContainer = document.querySelector('.slider-indicators');

if (projectsGrid && prevBtn && nextBtn && indicatorsContainer) {
    const projectCards = projectsGrid.querySelectorAll('.project-card');
    
    // Create Indicators based on project count
    projectCards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            stopAutoScroll();
            const cardWidth = projectCards[0].clientWidth + 30;
            projectsGrid.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            setTimeout(startAutoScroll, 2000); // Resume auto scroll after a delay
        });
        
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    const getScrollAmount = () => {
        const card = projectsGrid.querySelector('.project-card');
        return card ? card.clientWidth + 30 : projectsGrid.clientWidth;
    };

    const updateActiveIndicator = () => {
        const scrollLeft = projectsGrid.scrollLeft;
        const cardWidth = getScrollAmount();
        const activeIndex = Math.round(scrollLeft / cardWidth);
        
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === activeIndex);
        });
    };

    projectsGrid.addEventListener('scroll', updateActiveIndicator);

    prevBtn.addEventListener('click', () => {
        projectsGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
        if (projectsGrid.scrollLeft >= maxScroll - 10) {
            projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            projectsGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    });

    // Auto Scroll Logic
    let autoScrollInterval;
    const startAutoScroll = () => {
        stopAutoScroll(); 
        autoScrollInterval = setInterval(() => {
            const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
            if (projectsGrid.scrollLeft >= maxScroll - 10) {
                projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                projectsGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        }, 5000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
    };

    startAutoScroll();

    // Pause on interaction
    const container = document.querySelector('.slider-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
        container.addEventListener('touchstart', stopAutoScroll, {passive: true});
        container.addEventListener('touchend', startAutoScroll, {passive: true});
    }
}


