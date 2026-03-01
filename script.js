// Moon Lounge - Interactive Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .menu-card, .gallery-item, .review-card, .entertainment-item, .about-content, .contact-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Gallery image click handler (simple lightbox effect)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay span').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${overlay}">
                    <span class="lightbox-caption">${overlay}</span>
                    <button class="lightbox-close">×</button>
                </div>
            `;
            
            // Add lightbox styles
            const style = document.createElement('style');
            style.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 15, 0.95);
                    cursor: pointer;
                }
                .lightbox-content {
                    position: relative;
                    z-index: 1;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 4px;
                }
                .lightbox-caption {
                    display: block;
                    margin-top: 20px;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.5rem;
                    color: #c9a962;
                }
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 3rem;
                    cursor: pointer;
                    line-height: 1;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox handlers
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
            };
            
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            
            // Close on escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        });
    });
    
    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg img');
    
    window.addEventListener('scroll', function() {
        if (heroBg && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add hover sound effect simulation (visual feedback)
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-reserve');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Stats counter animation
    const statsSection = document.querySelector('.reviews-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.textContent);
                    const isDecimal = stat.textContent.includes('.');
                    const duration = 2000;
                    const start = 0;
                    const startTime = performance.now();
                    
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const current = start + (target - start) * easeOutQuart;
                        
                        if (isDecimal) {
                            stat.textContent = current.toFixed(1);
                        } else {
                            stat.textContent = Math.floor(current).toLocaleString();
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            stat.textContent = stat.textContent; // Final value
                        }
                    };
                    
                    requestAnimationFrame(animate);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    console.log('🌙 Moon Lounge website loaded successfully');
});