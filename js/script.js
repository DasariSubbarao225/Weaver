// Site Configuration Loader
const SITE_CONFIG_KEY = 'weaver_site_config';

// HTML escape function to prevent XSS
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load site configuration from localStorage
function loadSiteConfig() {
    const stored = localStorage.getItem(SITE_CONFIG_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error loading site config:', e);
        }
    }
    return null;
}

// Apply site configuration to the page
function applySiteConfig() {
    const config = loadSiteConfig();
    if (!config) return;

    // Apply site name and description
    if (config.site) {
        const navBrand = document.querySelector('.nav-brand h1');
        if (navBrand && config.site.name) navBrand.textContent = config.site.name;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && config.site.description) metaDesc.setAttribute('content', config.site.description);
        
        const footerText = document.querySelector('.footer p:last-child');
        if (footerText && config.site.tagline) footerText.textContent = config.site.tagline;
    }

    // Apply hero section
    if (config.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBtn = document.querySelector('.hero .btn-primary');
        const heroSection = document.querySelector('.hero');
        
        if (heroTitle && config.hero.title) heroTitle.textContent = config.hero.title;
        if (heroSubtitle && config.hero.subtitle) heroSubtitle.textContent = config.hero.subtitle;
        if (heroBtn) {
            if (config.hero.buttonText) heroBtn.textContent = config.hero.buttonText;
            if (config.hero.buttonLink) heroBtn.setAttribute('href', config.hero.buttonLink);
        }
        if (heroSection && config.hero.backgroundImage) {
            heroSection.style.background = `url('${escapeHtml(config.hero.backgroundImage)}') center/cover no-repeat`;
        }
    }

    // Apply about section
    if (config.about) {
        const aboutTitle = document.querySelector('.about .section-title');
        const aboutText = document.querySelector('.about-text');
        const featuresContainer = document.querySelector('.about-features');
        
        if (aboutTitle && config.about.title) aboutTitle.textContent = config.about.title;
        
        if (aboutText && config.about.paragraphs) {
            aboutText.innerHTML = config.about.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
        }
        
        if (featuresContainer && config.about.features) {
            featuresContainer.innerHTML = config.about.features.map(f => `
                <div class="feature">
                    <div class="feature-icon">${escapeHtml(f.icon)}</div>
                    <h3>${escapeHtml(f.title)}</h3>
                    <p>${escapeHtml(f.description)}</p>
                </div>
            `).join('');
        }
    }

    // Apply services section
    if (config.services) {
        const servicesTitle = document.querySelector('.services .section-title');
        const servicesGrid = document.querySelector('.services-grid');
        
        if (servicesTitle && config.services.title) servicesTitle.textContent = config.services.title;
        
        if (servicesGrid && config.services.items) {
            servicesGrid.innerHTML = config.services.items.map(s => `
                <div class="service-card">
                    <h3>${escapeHtml(s.title)}</h3>
                    <p>${escapeHtml(s.description)}</p>
                </div>
            `).join('');
        }
    }

    // Apply portfolio section
    if (config.portfolio) {
        const portfolioTitle = document.querySelector('.portfolio .section-title');
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        if (portfolioTitle && config.portfolio.title) portfolioTitle.textContent = config.portfolio.title;
        
        if (portfolioGrid && config.portfolio.items) {
            portfolioGrid.innerHTML = config.portfolio.items.map(p => {
                const bgStyle = p.image 
                    ? `background-image: url('${escapeHtml(p.image)}')`
                    : `background: ${escapeHtml(p.gradient) || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}`;
                
                return `
                    <div class="portfolio-item" ${p.videoUrl ? `data-video="${escapeHtml(p.videoUrl)}"` : ''}>
                        <div class="portfolio-image" style="${bgStyle}">
                            ${p.videoUrl ? '<span class="video-indicator">🎬</span>' : ''}
                        </div>
                        <div class="portfolio-info">
                            <h3>${escapeHtml(p.title)}</h3>
                            <p>${escapeHtml(p.description)}</p>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Re-initialize portfolio click handlers
            initPortfolioHandlers();
        }
    }

    // Apply contact section
    if (config.contact) {
        const contactTitle = document.querySelector('.contact .section-title');
        const contactInfo = document.querySelector('.contact-info');
        
        if (contactTitle && config.contact.title) contactTitle.textContent = config.contact.title;
        
        if (contactInfo) {
            contactInfo.innerHTML = `
                <h3>Contact Information</h3>
                <p>📞 Phone: ${escapeHtml(config.contact.phone)}</p>
                <p>📧 Email: ${escapeHtml(config.contact.email)}</p>
                <p>📍 Address: ${escapeHtml(config.contact.address)}</p>
                <div class="business-hours">
                    <h4>${escapeHtml(config.contact.businessHours?.title) || 'Business Hours'}</h4>
                    ${(config.contact.businessHours?.hours || []).map(h => `<p>${escapeHtml(h)}</p>`).join('')}
                </div>
            `;
        }
    }

    // Apply theme settings
    if (config.settings) {
        const root = document.documentElement;
        if (config.settings.primaryColor) {
            root.style.setProperty('--primary-color', config.settings.primaryColor);
        }
        if (config.settings.secondaryColor) {
            root.style.setProperty('--secondary-color', config.settings.secondaryColor);
        }
    }
}

// Initialize portfolio click handlers
function initPortfolioHandlers() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.dataset.video;
            const title = item.querySelector('h3').textContent;
            
            if (videoUrl) {
                // Open video in modal or new tab
                window.open(videoUrl, '_blank');
            } else {
                alert(`Project: ${title}\n\nClick to view full portfolio details (feature coming soon!)`);
            }
        });
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth Scrolling for Navigation Links
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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (in production, this would send to a server)
        setTimeout(() => {
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }, 500);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Scroll Animation for Elements
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

// Observe all sections for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Immediately show the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Portfolio Item Click Effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoUrl = item.dataset?.video;
        const title = item.querySelector('h3').textContent;
        
        if (videoUrl) {
            window.open(videoUrl, '_blank');
        } else {
            alert(`Project: ${title}\n\nClick to view full portfolio details (feature coming soon!)`);
        }
    });
});

// Add scroll-based navbar styling
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Log initialization
console.log('Weaver Interiors - Website Initialized');
console.log('Version: 1.1.0');

// Apply site configuration on DOM load
document.addEventListener('DOMContentLoaded', () => {
    applySiteConfig();
});
