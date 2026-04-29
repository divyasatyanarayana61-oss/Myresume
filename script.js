// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// ============================================
// HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate inputs
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // If validation passes
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server
    // For now, we'll just log it
    console.log({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '5px',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500',
        maxWidth: '300px'
    });

    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#3b82f6';
        notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.project-card, .education-card, .cert-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL BEHAVIOR (FALLBACK)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// RESPONSIVE NAVBAR MENU STYLES (via JS for better control)
// ============================================

// Add media query listener for responsive behavior
if (window.innerWidth <= 768) {
    setupMobileMenu();
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    } else {
        cleanupMobileMenu();
    }
});

function setupMobileMenu() {
    if (navbarMenu.style.display !== 'flex') {
        navbarMenu.style.cssText = `
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            flex-direction: column;
            background-color: var(--bg-color);
            padding: 20px;
            gap: 10px;
            display: none;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        `;
    }
}

function cleanupMobileMenu() {
    navbarMenu.style.cssText = '';
}

// Toggle mobile menu visibility
hamburger.addEventListener('click', () => {
    if (navbarMenu.style.display === 'none' || navbarMenu.style.display === '') {
        navbarMenu.style.display = 'flex';
        hamburger.classList.add('active');
    } else {
        navbarMenu.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// ============================================
// ACTIVE NAVBAR LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// UTILITY: Add loading state to buttons
// ============================================

function addLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Loading...';
    
    return () => {
        button.disabled = false;
        button.textContent = originalText;
    };
}

// ============================================
// LOG INITIALIZATION
// ============================================

console.log('Portfolio website loaded successfully! 🚀');
