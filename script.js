// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navToggle.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
});

function getHamburgerTransform(index) {
    const transforms = [
        'rotate(45deg) translate(5px, 5px)',
        'translateX(-100%)',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return transforms[index];
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
        });
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for progress bar
            if (entry.target.classList.contains('progress-fill')) {
                animateProgressBar(entry.target);
            }
            
            // Special handling for stats
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .benefit-item, .progress-fill, .stat-number').forEach(el => {
    observer.observe(el);
});

// Animate Progress Bar
function animateProgressBar(element) {
    const width = element.style.width;
    element.style.width = '0';
    
    setTimeout(() => {
        element.style.width = width;
    }, 200);
}

// Animate Counter
function animateCounter(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        const formattedNumber = isPercentage 
            ? `+${current.toFixed(1)}%`
            : `vs ${current.toFixed(1)}%`;
            
        element.textContent = text.includes('vs') ? formattedNumber : `+${current.toFixed(1)}%`;
    }, duration / steps);
}

// Button Interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Download Button Actions
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function() {
        const platform = this.querySelector('strong').textContent;
        showDownloadModal(platform);
    });
});

// CTA Button Actions
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Baixar')) {
            showDownloadModal('App');
        }
    });
});

// Demo Button Action
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Demo')) {
            showDemoModal();
        }
    });
});

// Show Download Modal
function showDownloadModal(platform) {
    const modal = createModal(`
        <div class="modal-content">
            <h2>Download SmartSaver</h2>
            <p>Em breve disponível para ${platform}!</p>
            <p>Deixe seu email e seja notificado quando lançarmos:</p>
            <form class="email-form">
                <input type="email" placeholder="seu@email.com" required>
                <button type="submit">Notificar-me</button>
            </form>
        </div>
    `);
    
    const form = modal.querySelector('.email-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Simulate API call
        setTimeout(() => {
            alert(`Obrigado! Você será notificado em ${email} quando o app estiver disponível.`);
            modal.remove();
        }, 1000);
    });
}

// Show Demo Modal
function showDemoModal() {
    const modal = createModal(`
        <div class="modal-content">
            <h2>Demo do SmartSaver</h2>
            <p>Veja como funciona o nosso app:</p>
            <div class="demo-features">
                <div class="demo-feature">
                    <i class="fas fa-chart-line"></i>
                    <span>Dashboard em tempo real</span>
                </div>
                <div class="demo-feature">
                    <i class="fas fa-robot"></i>
                    <span>Investimento automático</span>
                </div>
                <div class="demo-feature">
                    <i class="fas fa-shield-alt"></i>
                    <span>Segurança total</span>
                </div>
            </div>
            <p>Em breve disponível a versão completa!</p>
        </div>
    `);
}

// Create Modal
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-dialog">
                <button class="modal-close">&times;</button>
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-dialog {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            animation: modalShow 0.3s ease-out forwards;
        }
        
        @keyframes modalShow {
            to {
                transform: scale(1);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
        }
        
        .modal-content h2 {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .modal-content p {
            color: #666;
            margin-bottom: 1rem;
        }
        
        .email-form {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .email-form input {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .email-form button {
            padding: 0.75rem 1.5rem;
            background: #f7931a;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .demo-features {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .demo-feature {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .demo-feature i {
            color: #f7931a;
            font-size: 1.2rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            modal.remove();
            style.remove();
        }
    });
    
    return modal;
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .feature-card.animate,
    .step.animate,
    .benefit-item.animate {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

document.head.appendChild(animationStyles);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bar on page load
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            animateProgressBar(progressFill);
        }
    }, 1000);
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const email = this.querySelector('input[type="email"]');
        
        if (email && !isValidEmail(email.value)) {
            e.preventDefault();
            email.style.borderColor = '#ef4444';
            email.placeholder = 'Por favor, insira um email válido';
        }
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Performance optimization
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

console.log('SmartSaver Landing Page loaded successfully! 🚀');