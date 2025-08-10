// Typewriter effect for languages
const languages = [
    "English",
    "Español", 
    "Français",
    "Deutsch",
    "Português",
    "Italiano",
    "Svenska",
    "Polska", 
    "Norsk",
    "Nederlands"
];

// Shuffle array to get random order
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let shuffledLanguages = shuffleArray(languages);
let currentIndex = 0;
let currentText = '';
let isDeleting = false;
let typeSpeed = 100;
const rotatingElement = document.getElementById('rotating-text');

function typewriterEffect() {
    const currentLanguage = shuffledLanguages[currentIndex];
    
    if (!isDeleting) {
        // Typing out
        currentText = currentLanguage.substring(0, currentText.length + 1);
        typeSpeed = 80; // 100ms / 1.25 = 80ms
    } else {
        // Deleting
        currentText = currentLanguage.substring(0, currentText.length - 1);
        typeSpeed = 40; // 50ms / 1.25 = 40ms
    }
    
    rotatingElement.textContent = currentText;
    
    // Check if word is complete
    if (!isDeleting && currentText === currentLanguage) {
        // Pause at end of word
        typeSpeed = 1600; // 2000ms / 1.25 = 1600ms
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        // Move to next language
        isDeleting = false;
        currentIndex = (currentIndex + 1) % shuffledLanguages.length;
        
        // If we've gone through all languages, reshuffle
        if (currentIndex === 0) {
            shuffledLanguages = shuffleArray(languages);
        }
        
        typeSpeed = 160; // 200ms / 1.25 = 160ms
    }
    
    setTimeout(typewriterEffect, typeSpeed);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Premium Loading Sequence
function initLoadingSequence() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Hide loading after 2.5 seconds
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingOverlay.remove();
        }, 600);
    }, 2500);
}

// Cursor Follow Light Effect
function initCursorLight() {
    const cursorLight = document.getElementById('cursor-light');
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorLight.style.left = mouseX + 'px';
        cursorLight.style.top = mouseY + 'px';
        
        if (!isMoving) {
            cursorLight.style.opacity = '1';
            isMoving = true;
        }
        
        // Hide after no movement
        clearTimeout(cursorLight.hideTimer);
        cursorLight.hideTimer = setTimeout(() => {
            cursorLight.style.opacity = '0';
            isMoving = false;
        }, 2000);
    });
}

// Magnetic Button Effects (Desktop Only)
function initMagneticButtons() {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) * 0.15;
                const deltaY = (y - centerY) * 0.15;
                
                button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px)';
            });
        });
    }
}

// Advanced Scroll Animations
function initScrollAnimations() {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
    
    // Observe elements for scroll animations
    document.querySelectorAll('.section, .glass-card, .process-step').forEach(el => {
        el.classList.add('scroll-animate');
        scrollObserver.observe(el);
    });
}

// Start typewriter and animations after page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading sequence
    initLoadingSequence();
    
    // Set initial state
    rotatingElement.style.opacity = '1';
    rotatingElement.textContent = '';
    
    // Start effects after loading completes
    setTimeout(() => {
        // Start typewriter effect
        typewriterEffect();
        
        // Initialize premium effects
        initCursorLight();
        initMagneticButtons();
        initScrollAnimations();
        
        // Original scroll animations
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(section);
        });
    }, 3000);
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
});