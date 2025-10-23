/**
         * Portfolio Header Navigation
         * Handles mobile menu toggle and active link states
         */
        
        // Cache DOM elements for performance
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        /**
         * Toggle mobile menu
         * Handles opening/closing navigation on mobile devices
         */
        function toggleMenu() {
            const isActive = nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }

        /**
         * Close mobile menu
         * Used when clicking outside or on a nav link
         */
        function closeMenu() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        /**
         * Update active navigation link
         * @param {HTMLElement} clickedLink - The navigation link that was clicked
         */
        function updateActiveLink(clickedLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            clickedLink.classList.add('active');
        }

        /**
         * Handle navigation link clicks
         */
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                updateActiveLink(link);
                closeMenu();
            });
        });

        /**
         * Handle menu toggle button click
         */
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        /**
         * Close menu when clicking outside on mobile
         */
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        /**
         * Handle escape key to close menu
         */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        /**
         * Reset menu state on window resize
         * Ensures proper behavior when switching between mobile/desktop views
         */
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && nav.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });

       



        // ==================== TYPING ANIMATION ====================
        
        /**
         * Typing Animation Effect
         * Creates a realistic typing effect that cycles through multiple phrases
         */
        class TypingAnimation {
            constructor(element, phrases, options = {}) {
                this.element = element;
                this.phrases = phrases;
                this.phraseIndex = 0;
                this.charIndex = 0;
                this.isDeleting = false;
                
                // Configurable speeds (in milliseconds)
                this.typingSpeed = options.typingSpeed || 100;
                this.deletingSpeed = options.deletingSpeed || 50;
                this.pauseBeforeDelete = options.pauseBeforeDelete || 2000;
                this.pauseBeforeType = options.pauseBeforeType || 500;
                
                // Start the animation after a brief delay
                setTimeout(() => this.animate(), 800);
            }
            
            /**
             * Main animation loop
             */
            animate() {
                const currentPhrase = this.phrases[this.phraseIndex];
                
                if (this.isDeleting) {
                    // Deleting characters
                    this.charIndex--;
                    this.element.textContent = currentPhrase.substring(0, this.charIndex);
                    
                    // Finished deleting
                    if (this.charIndex === 0) {
                        this.isDeleting = false;
                        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                        setTimeout(() => this.animate(), this.pauseBeforeType);
                        return;
                    }
                    
                    setTimeout(() => this.animate(), this.deletingSpeed);
                } else {
                    // Typing characters
                    this.charIndex++;
                    this.element.textContent = currentPhrase.substring(0, this.charIndex);
                    
                    // Finished typing
                    if (this.charIndex === currentPhrase.length) {
                        this.isDeleting = true;
                        setTimeout(() => this.animate(), this.pauseBeforeDelete);
                        return;
                    }
                    
                    setTimeout(() => this.animate(), this.typingSpeed);
                }
            }
        }
        
        // Initialize typing animation
        const typingElement = document.getElementById('typingText');
        const phrases = [
            "I'm a Front-End Developer.",
            "I build modern, responsive, and engaging web experiences.",
            "I design and develop user-friendly interfaces.",
            "I turn ideas into interactive digital experiences."
        ];
        
        // Create the typing animation instance
        new TypingAnimation(typingElement, phrases, {
            typingSpeed: 80,
            deletingSpeed: 40,
            pauseBeforeDelete: 2000,
            pauseBeforeType: 500
        });



        // ==================== SKILLS PROGRESS ANIMATION ====================
        
        /**
         * Intersection Observer for Skills Section
         * Animates progress bars when they come into view
         */
        class SkillsAnimator {
            constructor() {
                this.skillsContainer = document.querySelector('.skills-container');
                this.skillItems = document.querySelectorAll('.skill-item');
                this.animated = false;
                
                // Create Intersection Observer
                this.observer = new IntersectionObserver(
                    (entries) => this.handleIntersect(entries),
                    {
                        root: null,
                        rootMargin: '0px 0px -100px 0px',
                        threshold: 0.2
                    }
                );
                
                // Start observing
                if (this.skillsContainer) {
                    this.observer.observe(this.skillsContainer);
                }
            }
            
            /**
             * Handle intersection changes
             */
            handleIntersect(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animateSkills();
                        this.animated = true;
                    }
                });
            }
            
            /**
             * Animate all skill bars with staggered delay
             */
            animateSkills() {
                // Fade in container
                this.skillsContainer.classList.add('visible');
                
                // Animate each skill bar with staggered delay
                this.skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 150);
                });
            }
        }
        
        // Initialize skills animator when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            new SkillsAnimator();
        });








        
        class ProjectsAnimator {
            constructor() {
                this.projectCards = document.querySelectorAll('.project-card');
                
                // Create Intersection Observer
                this.observer = new IntersectionObserver(
                    (entries) => this.handleIntersect(entries),
                    {
                        root: null,
                        rootMargin: '0px 0px -80px 0px',
                        threshold: 0.15
                    }
                );
                
                // Start observing each project card
                this.projectCards.forEach(card => {
                    this.observer.observe(card);
                });
            }
            
            /**
             * Handle intersection changes
             */
            handleIntersect(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add visible class with a slight delay based on card index
                        const cards = Array.from(this.projectCards);
                        const index = cards.indexOf(entry.target);
                        
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        
                        // Stop observing once animated
                        this.observer.unobserve(entry.target);
                    }
                });
            }
        }
        
        // Initialize animators when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            new SkillsAnimator();
            new ProjectsAnimator();
        });








        class AboutAnimator {
    constructor() {
        this.aboutContent = document.querySelector('.about-content');
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.statsAnimated = false;
        
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.2
            }
        );
        
        // Start observing
        if (this.aboutContent) {
            this.observer.observe(this.aboutContent);
        }
    }
    
    /**
     * Handle intersection changes
     */
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated) {
                entry.target.classList.add('visible');
                this.animated = true;
                
                // Start counting stats after a delay
                setTimeout(() => {
                    this.animateStats();
                }, 1000);
            }
        });
    }
    
    /**
     * Animate stat numbers counting up
     */
    animateStats() {
        if (this.statsAnimated) return;
        this.statsAnimated = true;
        
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }
}

// Initialize About section animator
new AboutAnimator();




class ContactAnimator {
    constructor() {
        this.contactContent = document.querySelector('.contact-content');
        this.contactForm = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.animated = false;
        
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.2
            }
        );
        
        // Start observing
        if (this.contactContent) {
            this.observer.observe(this.contactContent);
        }

        // Setup form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    /**
     * Handle intersection changes
     */
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated) {
                entry.target.classList.add('visible');
                this.animated = true;
            }
        });
    }
    
    /**
     * Handle form submission
     */
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate fields
        if (!this.validateForm(name, email, message)) {
            return;
        }
        
        // Format WhatsApp message
        const whatsappMessage = `*New Message from Portfolio*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:*%0A${encodeURIComponent(message)}`;
        
        
        const whatsappNumber = '2348134260378'; 
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Show success message
        this.showSuccessMessage();
        
        // Open WhatsApp in new tab after short delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Reset form after opening WhatsApp
            setTimeout(() => {
                this.contactForm.reset();
                this.hideSuccessMessage();
            }, 3000);
        }, 800);
    }
    
    /**
     * Validate form fields
     */
    validateForm(name, email, message) {
        let isValid = true;
        
        // Validate name
        if (name === '') {
            this.showError('nameError', 'Please enter your name');
            isValid = false;
        } else {
            this.hideError('nameError');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            this.showError('emailError', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email');
            isValid = false;
        } else {
            this.hideError('emailError');
        }
        
        // Validate message
        if (message === '') {
            this.showError('messageError', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            this.showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            this.hideError('messageError');
        }
        
        return isValid;
    }
    
    /**
     * Show error message
     */
    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    /**
     * Hide error message
     */
    hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    /**
     * Show success message
     */
    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');
        }
    }
    
    /**
     * Hide success message
     */
    hideSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.remove('show');
        }
    }
}

// Initialize Contact section animator
new ContactAnimator();









class TestimonialsManager {
            constructor() {
                this.carousel = document.getElementById('testimonialsCarousel');
                this.form = document.getElementById('testimonialForm');
                this.toast = document.getElementById('successToast');
                
                // Default testimonials
                this.defaultTestimonials = [
                    {
                        name: 'Sarah Johnson',
                        role: 'CEO, TechStart Inc.',
                        text: 'Working with Chris was an absolute pleasure. His attention to detail and creative solutions exceeded our expectations. The website he built for us not only looks stunning but performs flawlessly.',
                        image: './assets/img/Sandy taylor.jpg'
                    },
                    {
                        name: 'Ifeoluwa Nasrat',
                        role: 'Product Manager, Digital Solutions',
                        text: 'Chris delivered our project ahead of schedule with exceptional quality. His expertise in frontend development and responsive design is truly impressive. Highly recommended!',
                        image: './assets/img/nasrat.jpg'
                    },
                    {
                        name: 'Michael Chen',
                        role: 'Marketing Director, Creative Agency',
                        text: 'The food ordering website Chris created for us has transformed our business. The WhatsApp integration works seamlessly, and our customers love the user-friendly interface.',
                        image: './assets/img/Michael-Cole-Fontayn.jpg'
                    }
                ];
                
                this.init();
            }
            
            init() {
                this.loadTestimonials();
                this.setupFormSubmit();
            }
            
            // Load testimonials from localStorage or use defaults
            loadTestimonials() {
                const stored = localStorage.getItem('mr6ix_testimonials');
                const testimonials = stored ? JSON.parse(stored) : this.defaultTestimonials;
                
                // If no stored testimonials, save defaults
                if (!stored) {
                    localStorage.setItem('mr6ix_testimonials', JSON.stringify(this.defaultTestimonials));
                }
                
                this.renderTestimonials(testimonials);
            }
            
            // Render testimonials to carousel
            renderTestimonials(testimonials) {
                this.carousel.innerHTML = '';
                
                testimonials.forEach((testimonial, index) => {
                    const card = this.createTestimonialCard(testimonial, index);
                    this.carousel.appendChild(card);
                });
            }
            
            // Create testimonial card element
            createTestimonialCard(testimonial, index) {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.style.animationDelay = `${index * 0.1}s`;
                
                const initials = this.getInitials(testimonial.name);
                const imageHTML = testimonial.image 
                    ? `<img src="${testimonial.image}" alt="${testimonial.name}">`
                    : initials;
                
                card.innerHTML = `
                    <div class="quote-icon">"</div>
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="client-info">
                        <div class="client-image">${imageHTML}</div>
                        <div class="client-details">
                            <h4 class="client-name">${testimonial.name}</h4>
                            <p class="client-role">${testimonial.role || 'Client'}</p>
                        </div>
                    </div>
                `;
                
                return card;
            }
            
            // Get initials from name
            getInitials(name) {
                return name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);
            }
            
            // Setup form submission
            setupFormSubmit() {
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSubmit();
                });
            }
            
            // Handle form submission
            handleSubmit() {
                const name = document.getElementById('clientName').value.trim();
                const role = document.getElementById('clientRole').value.trim();
                const image = document.getElementById('clientImage').value.trim();
                const text = document.getElementById('testimonialText').value.trim();
                
                if (!name || !text) {
                    return;
                }
                
                const newTestimonial = {
                    name,
                    role: role || 'Client',
                    image,
                    text
                };
                
                // Get existing testimonials
                const stored = localStorage.getItem('mr6ix_testimonials');
                const testimonials = stored ? JSON.parse(stored) : this.defaultTestimonials;
                
                // Add new testimonial to the beginning
                testimonials.unshift(newTestimonial);
                
                // Save to localStorage
                localStorage.setItem('mr6ix_testimonials', JSON.stringify(testimonials));
                
                // Re-render testimonials
                this.renderTestimonials(testimonials);
                
                // Show success toast
                this.showToast();
                
                // Reset form
                this.form.reset();
                
                // Scroll to show new testimonial
                this.carousel.scrollTo({ left: 0, behavior: 'smooth' });
            }
            
            // Show success toast
            showToast() {
                this.toast.classList.add('show');
                
                setTimeout(() => {
                    this.toast.classList.remove('show');
                }, 3000);
            }
        }
        
        // Initialize testimonials manager
        new TestimonialsManager();














        (function() {
            'use strict';

            // ===== FOOTER FADE-IN ANIMATION =====
            const footer = document.getElementById('footer');
            
            // Use IntersectionObserver for fade-in effect
            if ('IntersectionObserver' in window && footer) {
                const footerObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            footerObserver.unobserve(entry.target); // Only animate once
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '0px 0px -100px 0px',
                    threshold: 0.1
                });
                
                footerObserver.observe(footer);
            } else if (footer) {
                // Fallback: immediately show footer if IntersectionObserver not available
                footer.classList.add('visible');
            }

            // ===== BACK TO TOP BUTTON =====
            const backToTopBtn = document.getElementById('backToTop');
            
            if (backToTopBtn) {
                // Show/hide button based on scroll position
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                });

                // Smooth scroll to top on click
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });

                // Keyboard accessibility
                backToTopBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                });
            }

            // ===== NEWSLETTER FORM (OPTIONAL - FRONT-END ONLY) =====
            const newsletterForm = document.getElementById('newsletterForm');
            const newsletterSuccess = document.getElementById('newsletterSuccess');
            
            if (newsletterForm && newsletterSuccess) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const emailInput = newsletterForm.querySelector('input[type="email"]');
                    const email = emailInput.value.trim();
                    
                    if (email) {
                        // Store email in localStorage (front-end simulation)
                        const subscribers = JSON.parse(localStorage.getItem('mr6ix_subscribers') || '[]');
                        
                        if (!subscribers.includes(email)) {
                            subscribers.push(email);
                            localStorage.setItem('mr6ix_subscribers', JSON.stringify(subscribers));
                        }
                        
                        // Show success message
                        newsletterSuccess.classList.add('show');
                        emailInput.value = '';
                        
                        // Hide success message after 4 seconds
                        setTimeout(() => {
                            newsletterSuccess.classList.remove('show');
                        }, 4000);
                    }
                });
            }

            // ===== SMOOTH SCROLL FOR NAV LINKS =====
            const footerLinks = document.querySelectorAll('.footer-link');
            
            footerLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    // Only handle internal links (starting with #)
                    if (href && href.startsWith('#')) {
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

        })();