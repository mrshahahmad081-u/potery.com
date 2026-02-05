class MagicAnimations {
    constructor() {
        this.initializeAnimations();
        this.setupHomeTransition();
    }
    
    initializeAnimations() {
        // Initialize GSAP
        if (typeof gsap !== 'undefined') {
            // Animate elements on page load
            this.animateEntrance();
            
            // Setup button hover animations
            this.setupButtonAnimations();
        }
    }
    
    animateEntrance() {
        const tl = gsap.timeline();
        
        tl.from('.logo-container', {
            duration: 1.5,
            scale: 0.5,
            opacity: 0,
            rotation: 180,
            ease: "back.out(1.7)"
        })
        .from('.magic-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: "power3.out"
        }, "-=0.5")
        .from('.tagline', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3")
        .from('.nav-btn', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.2");
    }
    
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.magic-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const btnRect = button.getBoundingClientRect();
                const x = e.clientX - btnRect.left;
                const y = e.clientY - btnRect.top;
                
                const ripple = document.createElement('div');
                ripple.className = 'btn-ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('click', (e) => {
                // Create sparkle effect
                for (let i = 0; i < 8; i++) {
                    this.createButtonSparkle(e);
                }
                
                // Sound effect (optional)
                this.playMagicSound();
            });
        });
    }
    
    setupHomeTransition() {
        const homeBtn = document.getElementById('homeBtn');
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                this.transitionToHome();
            });
        }
    }
    
    transitionToHome() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        const tl = gsap.timeline();
        
        tl.to(transition, {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                // Add magical particles during transition
                this.createTransitionParticles();
            }
        })
        .to(transition, {
            scaleY: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                // Navigate to home page
                window.location.href = 'home.html';
            }
        });
    }
    
    createTransitionParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-spark';
            particle.style.width = Math.random() * 8 + 2 + 'px';
            particle.style.height = particle.style.width;
            
            // Random position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Random color
            const colors = ['#8a2be2', '#00ffff', '#ff00ff', '#ffffff'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random movement
            particle.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
            particle.style.setProperty('--ty', (Math.random() * -200) + 'px');
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1500);
        }
    }
    
    createButtonSparkle(event) {
        const spark = document.createElement('div');
        spark.className = 'magic-spark';
        
        spark.style.left = event.clientX + 'px';
        spark.style.top = event.clientY + 'px';
        
        spark.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
        spark.style.setProperty('--ty', (Math.random() * 100 - 50) + 'px');
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.remove();
            }
        }, 1500);
    }
    
    playMagicSound() {
        // This would play a magic sound effect
        // In production, add actual sound files
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log("Audio not supported or user hasn't interacted yet");
        }
    }
    
    // Modal animations
    static showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            
            const content = modal.querySelector('.modal-content');
            if (content && typeof gsap !== 'undefined') {
                gsap.fromTo(content,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }
        }
    }
    
    static hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const content = modal.querySelector('.modal-content');
            if (content && typeof gsap !== 'undefined') {
                gsap.to(content, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        modal.style.display = 'none';
                    }
                });
            } else {
                modal.style.display = 'none';
            }
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        window.magicAnimations = new MagicAnimations();
    }
    
    // Initialize particles.js background
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: ["#8a2be2", "#00ffff", "#ff00ff"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#8a2be2",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
        } catch (e) {
            console.log("Particles.js configuration error", e);
        }
    }
});
