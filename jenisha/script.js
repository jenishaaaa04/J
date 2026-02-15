// Birthday Countdown Timer
// Update the birthday date here: (year, month-1, day)
// Note: month is 0-indexed (0 = January, 1 = February, etc.)
const BIRTHDAY_MONTH = 1; // February (0-indexed, so 1 = February)
const BIRTHDAY_DAY = 25; // 25th

function updateCountdown() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();
    
    // Set target date to birthday of current or next year
    let targetDate = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0).getTime();
    
    // If birthday has already passed this year, set it for next year
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0).getTime();
    }
    
    const distance = targetDate - now;
    
    if (distance < 0) {
        // Birthday has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Add animation effect when numbers change
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl && daysEl.textContent !== days.toString()) {
        daysEl.style.animation = 'none';
        setTimeout(() => {
            daysEl.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    if (hoursEl && hoursEl.textContent !== hours.toString()) {
        hoursEl.style.animation = 'none';
        setTimeout(() => {
            hoursEl.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    if (minutesEl && minutesEl.textContent !== minutes.toString()) {
        minutesEl.style.animation = 'none';
        setTimeout(() => {
            minutesEl.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    if (secondsEl && secondsEl.textContent !== seconds.toString()) {
        secondsEl.style.animation = 'none';
        setTimeout(() => {
            secondsEl.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    
    // Format with leading zeros for cleaner look
    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Add pulse animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll animations for elements entering viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements when page loads
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.reason-card, .message-card, .moments-content');
    fadeElements.forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });
    
    // Initialize countdown on page load
    updateCountdown();
});

// Surprise button functionality
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');

if (surpriseBtn && surpriseMessage) {
    surpriseBtn.addEventListener('click', () => {
        // Hide button
        surpriseBtn.style.display = 'none';
        
        // Show message
        surpriseMessage.classList.remove('hidden');
        
        // Create confetti effect
        createConfetti();
        
        // Create heart rain
        createHeartRain();
    });

    // Keyboard accessibility
    surpriseBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            surpriseBtn.click();
        }
    });
}

// Close button functionality
const closeBtn = document.getElementById('closeBtn');

if (closeBtn && surpriseMessage) {
    closeBtn.addEventListener('click', () => {
        // Hide message with fade out animation
        surpriseMessage.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            surpriseMessage.classList.add('hidden');
            surpriseMessage.style.animation = '';
            // Show button again
            if (surpriseBtn) {
                surpriseBtn.style.display = '';
            }
        }, 300);
    });

    // Keyboard accessibility for close button
    closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeBtn.click();
        }
    });
}

// Confetti creation function
function createConfetti() {
    const colors = ['#5B9BD5', '#2E5C8A', '#87CEEB', '#B0E0E6', '#A8D5E2', '#9BB5FF', '#FFFFFF'];
    const confettiContainer = document.querySelector('.surprise-container');
    
    if (!confettiContainer) return;
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random() * 0.8 + 0.2;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            confettiContainer.appendChild(confetti);
            
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.transition = `all ${animationDuration}s ease-out`;
            
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px)`;
                confetti.style.opacity = '0';
            }, 10);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, animationDuration * 1000);
        }, i * 30);
    }
}

// Heart rain effect
function createHeartRain() {
    const hearts = ['💙', '💕', '💖', '💗', '💓', '💝', '❤️'];
    const surpriseContainer = document.querySelector('.surprise-container');
    
    if (!surpriseContainer) return;
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1001';
            
            surpriseContainer.appendChild(heart);
            
            const animationDuration = Math.random() * 2 + 3;
            const horizontalMovement = Math.random() * 200 - 100;
            
            heart.style.transition = `all ${animationDuration}s ease-in-out`;
            
            setTimeout(() => {
                heart.style.top = '100%';
                heart.style.transform = `translateX(${horizontalMovement}px)`;
                heart.style.opacity = '0';
            }, 10);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, animationDuration * 1000);
        }, i * 100);
    }
}

// Add floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const hearts = ['💙', '💕', '💖'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        
        heartsContainer.appendChild(heart);
        
        const animationDuration = Math.random() * 10 + 15;
        const horizontalMovement = Math.random() * 100 - 50;
        
        heart.style.transition = `all ${animationDuration}s linear`;
        
        setTimeout(() => {
            heart.style.top = '-50px';
            heart.style.transform = `translateX(${horizontalMovement}px)`;
            heart.style.opacity = '0';
        }, 10);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, animationDuration * 1000);
    }, 3000);
}

// Start floating hearts animation
createFloatingHearts();

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effects to reason cards
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
