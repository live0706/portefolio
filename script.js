/**
 * PORTFOLIO MAMADOU SECK - JAVASCRIPT
 * Fichier: script.js
 * Description: Interactions et animations pour le portfolio
 */

// ===== ATTENDRE LE CHARGEMENT COMPLET DU DOM =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c👋 Portfolio chargé avec succès!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    
    initNavigation();
    initScrollEffects();
    initAnimations();
    initScrollToTop();
    initTypingEffect();
    initParallax();
    initEasterEgg();
});

// ===== NAVIGATION & MENU BURGER =====
function initNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('nav');

    // Toggle menu burger
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Fermer le menu au clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (burger) burger.classList.remove('active');
        });
    });

    // Highlight section active dans la navigation
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Ajouter ombre à la navbar au scroll
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollEffects() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        reveals.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100); // Délai progressif
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check initial
}

// ===== TYPING EFFECT SUR LE TITRE HERO =====
function initTypingEffect() {
    const titleElement = document.querySelector('.hero h1');
    if (!titleElement) return;
    
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let charIndex = 0;
    
    const typeWriter = () => {
        if (charIndex < titleText.length) {
            titleElement.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Ajouter un cursor clignotant
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            titleElement.appendChild(cursor);
        }
    };
    
    setTimeout(typeWriter, 800);
}

// Ajouter le style pour le cursor clignotant
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== ANIMATIONS DIVERSES =====
function initAnimations() {
    // Animation des cartes de compétences
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animation des boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Progress bars animation (si présentes)
    animateProgressBars();
}

// ===== ANIMATION DES BARRES DE PROGRESSION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-progress') || '80';
                bar.style.width = targetWidth + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// ===== BOUTON SCROLL TO TOP =====
function initScrollToTop() {
    // Créer le bouton s'il n'existe pas
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.classList.add('scroll-top-btn');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(scrollTopBtn);
    }

    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Action au clic
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== EFFET PARALLAX SUR LE HERO =====
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        start = Math.floor(target * easeOutQuad(progress));
        element.textContent = start;
        
        if (progress >= 1) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Fonction d'easing
function easeOutQuad(t) {
    return t * (2 - t);
}

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Récupérer les données
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || 'Contact depuis le portfolio',
            message: formData.get('message')
        };
        
        // Validation côté client
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs requis', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification(result.message, 'success');
                contactForm.reset();
            } else {
                showNotification(result.message || 'Erreur lors de l\'envoi', 'error');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Validation email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les anciennes notifications
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) oldNotif.remove();
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter les styles
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification.success {
            border-left: 4px solid #10b981;
        }
        
        .notification.error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification i {
            font-size: 1.5rem;
        }
        
        .notification.success i {
            color: #10b981;
        }
        
        .notification.error i {
            color: #ef4444;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        notifStyle.setAttribute('data-notification', 'true');
        document.head.appendChild(notifStyle);
    }
    
    document.body.appendChild(notification);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== EASTER EGG - KONAMI CODE =====
function initEasterEgg() {
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiPattern.join('')) {
            activateRainbowMode();
        }
    });
}

function activateRainbowMode() {
    document.body.style.animation = 'rainbow 3s infinite';
    showNotification('🎉 Mode Arc-en-ciel activé!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== CURSOR PERSONNALISÉ (DESKTOP ONLY) =====
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Agrandir le cursor sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

// ===== DÉTECTION DE THÈME SYSTÈME =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('🌙 Thème sombre détecté');
    // Possibilité d'ajouter un mode sombre automatique
}

// ===== ANALYTICS (OPTIONNEL) =====
function trackEvent(category, action, label) {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    // Intégrer Google Analytics ou autre ici
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page chargée en ${Math.round(loadTime)}ms`);
});

