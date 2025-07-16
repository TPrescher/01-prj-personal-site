// Enhanced Portfolio JavaScript - Beginner-friendly with detailed comments

// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // 1. SMOOTH NAVIGATION
    // ======================
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add smooth scrolling to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the default jump behavior
            
            // Get the target section ID from the link
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll smoothly to the target section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ======================
    // 2. ACTIVE LINK HIGHLIGHTING
    // ======================
    
    // Function to highlight the current section in navigation
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Account for fixed nav
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('text-accent-amber'); // Remove active class
            link.classList.add('text-text-light'); // Add default class
            
            // If this link matches the current section, make it active
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.remove('text-text-light');
                link.classList.add('text-accent-amber');
            }
        });
    }
    
    // Update active link when scrolling
    window.addEventListener('scroll', highlightActiveLink);
    
    // ======================
    // 3. TYPING ANIMATION
    // ======================
    
    // Add typing animation to hero text
    function createTypingEffect() {
        const heroText = document.querySelector('#hero h1');
        if (!heroText) return;
        
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Adjust speed here (lower = faster)
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Start the typing effect
    createTypingEffect();
    
    // ======================
    // 4. SCROLL ANIMATIONS
    // ======================
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('section');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s ease-in-out';
            }
        });
    }
    
    // Set initial state for animations
    function initializeAnimations() {
        const sections = document.querySelectorAll('section:not(#hero)');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
        });
    }
    
    // Initialize animations and set up scroll listener
    initializeAnimations();
    window.addEventListener('scroll', animateOnScroll);
    
    // ======================
    // 5. CONTACT FORM ENHANCEMENT
    // ======================
    
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic form validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset(); // Clear the form
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message p-4 rounded-lg mb-4 ${
            type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
        }`;
        messageElement.textContent = message;
        
        // Insert message before the form
        const form = document.querySelector('#contact form');
        form.parentNode.insertBefore(messageElement, form);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // ======================
    // 6. MOBILE MENU (for future enhancement)
    // ======================
    
    // Add mobile menu toggle functionality
    function initializeMobileMenu() {
        const nav = document.querySelector('nav ul');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'md:hidden fixed top-4 right-4 z-50 p-2 bg-section-bg text-text-light rounded-lg';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Add mobile menu functionality
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            this.innerHTML = nav.classList.contains('hidden') ? '☰' : '×';
        });
        
        // Add button to page
        document.body.appendChild(mobileMenuBtn);
        
        // Hide menu on mobile by default
        if (window.innerWidth < 768) {
            nav.classList.add('hidden');
            nav.classList.remove('flex');
        }
    }
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // ======================
    // 7. SKILL ANIMATION
    // ======================
    
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('#skills .grid > div');
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ======================
    // 8. PERFORMANCE OPTIMIZATIONS
    // ======================
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('opacity-100');
                    img.classList.remove('opacity-0');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            imageObserver.observe(img);
        });
    }
    
    // ======================
    // 9. CONSOLE WELCOME MESSAGE
    // ======================
    
    // Add a fun console message for developers
    console.log('%cWelcome to Tim Prescher\'s Portfolio!', 'color: #ffb347; font-size: 18px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS (Tailwind), and JavaScript', 'color: #ff5e3a; font-size: 14px;');
    console.log('%cInterested in collaboration? Let\'s connect!', 'color: #f5f5f5; font-size: 12px;');
    
});

// ======================
// 10. UTILITY FUNCTIONS
// ======================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}
