// Optimized Intersection Observer configuration
const createObserver = (options = {}, callback) => {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                entry.target.dataset.animated && observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, ...options });
};

// Single observer instance for multiple animations
const observer = createObserver({}, (element) => {
    element.classList.add('visible');
});

// Observe elements for animation
document.querySelectorAll('.project, .timeline-item').forEach(element => {
    element.dataset.animated = 'true';
    observer.observe(element);
});

// Timeline animation
const timeline = document.querySelector('.timeline');
if (timeline) {
    const timelineObserver = createObserver({}, (element) => {
        element.classList.add('timeline-animate');
    });
    timelineObserver.observe(timeline);
}

// Smooth scrolling amélioré
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Ici vous pouvez ajouter votre logique d'envoi de formulaire
        console.log('Formulaire soumis:', { name, email, message });
        
        // Réinitialisation du formulaire
        contactForm.reset();
        alert('Message envoyé !');
    });
}

// Animation de la navbar au scroll avec effet de flou
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter/retirer la classe scrolled pour l'effet de flou
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Cacher/montrer la navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Optimized text animation with requestAnimationFrame
const typeWriter = (element, text, speed = 50) => {
    let index = 0;
    const length = text.length;
    element.textContent = '';
    
    const animate = (timestamp) => {
        const progress = Math.floor(timestamp / speed);
        index = Math.min(progress, length);
        element.textContent = text.slice(0, index);
        
        if (index < length) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};

// Initialize hero text animation
const heroText = document.querySelector('.header-text p');
if (heroText) {
    const text = heroText.textContent.trim();
    typeWriter(heroText, text);
}

// Optimized skill progress animation
const animateProgress = createObserver(
    { threshold: 0.5 },
    (element) => {
        requestAnimationFrame(() => {
            element.style.width = `${element.dataset.progress}%`;
        });
    }
);

// Initialize skill animations
document.querySelectorAll('.skill-level-fill').forEach(progress => {
    progress.dataset.animated = 'true';
    animateProgress.observe(progress);
});
