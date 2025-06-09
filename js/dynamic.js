function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

// DOM Elements
const body = document.body;
const nav = document.querySelector('nav');
const scrollToTopBtn = document.createElement('button');
const darkModeToggle = document.createElement('button');

// Custom cursor elements
const cursor = document.createElement('div');
const cursorDot = document.createElement('div');
cursor.className = 'fixed w-8 h-8 border-2 border-blue-600 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-50 hidden md:block';
cursorDot.className = 'fixed w-2 h-2 bg-blue-600 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-50 ease-out z-50 hidden md:block';
body.appendChild(cursor);
body.appendChild(cursorDot);

// Loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50 transition-opacity duration-500';
loadingScreen.innerHTML = `
    <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-800 dark:text-white text-xl font-semibold">Loading...</p>
    </div>
`;
body.appendChild(loadingScreen);

// Initialize scroll to top button
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-blue-700 z-50';
body.appendChild(scrollToTopBtn);

// Initialize dark mode toggle
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-lg transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 z-50';
body.appendChild(darkModeToggle);

// Custom cursor movement
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorDotX = 0;
let cursorDotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    const dotDx = mouseX - cursorDotX;
    const dotDy = mouseY - cursorDotY;
    cursorDotX += dotDx * 0.2;
    cursorDotY += dotDy * 0.2;
    cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, input, textarea, select').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-150');
        cursorDot.classList.add('scale-150');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-150');
        cursorDot.classList.remove('scale-150');
    });
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});

// Smooth scrolling for navigation links
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

// Scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkMode();
}

function updateDarkMode() {
    if (isDarkMode) {
        body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.documentElement.classList.add('dark');
    } else {
        body.classList.remove('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.documentElement.classList.remove('dark');
    }
}

darkModeToggle.addEventListener('click', toggleDarkMode);
updateDarkMode();

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// EmailJS form submission
function sendEmail(e) {
    e.preventDefault();
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const formStatus = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    // Show loading state
    submitBtn.disabled = true;
    buttonText.textContent = 'Sending...';
    loadingSpinner.classList.remove('hidden');
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') ? 'Yes' : 'No'
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
        .then(function(response) {
            // Show success message
            formStatus.classList.remove('hidden');
            formStatus.classList.add('bg-green-100', 'dark:bg-green-900');
            statusMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            statusMessage.classList.add('text-green-800', 'dark:text-green-200');
            
            // Reset form
            form.reset();
        })
        .catch(function(error) {
            // Show error message
            formStatus.classList.remove('hidden');
            formStatus.classList.add('bg-red-100', 'dark:bg-red-900');
            statusMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            statusMessage.classList.add('text-red-800', 'dark:text-red-200');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            buttonText.textContent = 'Send Message';
            loadingSpinner.classList.add('hidden');
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
                formStatus.classList.remove('bg-green-100', 'bg-red-100', 'dark:bg-green-900', 'dark:bg-red-900');
                statusMessage.classList.remove('text-green-800', 'text-red-800', 'dark:text-green-200', 'dark:text-red-200');
            }, 5000);
        });
    
    return false;
}

// Form validation
function validateForm() {
    const form = document.getElementById('contact-form');
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    // Phone validation (optional)
    if (phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError('Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showError(message) {
    const formStatus = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    formStatus.classList.remove('hidden');
    formStatus.classList.add('bg-red-100', 'dark:bg-red-900');
    statusMessage.textContent = message;
    statusMessage.classList.add('text-red-800', 'dark:text-red-200');
    
    // Hide error message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
        formStatus.classList.remove('bg-red-100', 'dark:bg-red-900');
        statusMessage.classList.remove('text-red-800', 'dark:text-red-200');
    }, 5000);
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Enhanced scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (entry.target.classList.contains('animate-slide-up')) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
            if (entry.target.classList.contains('animate-slide-left')) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
            if (entry.target.classList.contains('animate-slide-right')) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
            if (entry.target.classList.contains('animate-scale')) {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    animateOnScroll.observe(element);
});

// Parallax effect for background elements
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Typing animation for headings
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation for main heading
const mainHeading = document.querySelector('h1');
if (mainHeading) {
    const text = mainHeading.textContent;
    typeWriter(mainHeading, text);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });
});

// Particle background effect
function createParticles() {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 pointer-events-none z-0';
    body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-blue-600 rounded-full opacity-20';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        container.appendChild(particle);
    }
}

// Initialize particle background
createParticles();

// Add ripple effect to buttons
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300';
body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
});