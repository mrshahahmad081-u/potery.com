class AuthSystem {
    constructor() {
        this.isAuthenticated = false;
        this.adminToken = null;
        this.initAuth();
    }
    
    initAuth() {
        // Check for existing session
        const token = localStorage.getItem('magicAdminToken');
        if (token && this.validateToken(token)) {
            this.isAuthenticated = true;
            this.adminToken = token;
            this.showAdminFeatures();
        }
        
        // Setup login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Setup modal controls
        this.setupModalControls();
    }
    
    setupModalControls() {
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeBtns = document.querySelectorAll('.close');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (typeof MagicAnimations !== 'undefined') {
                    MagicAnimations.showModal('loginModal');
                } else {
                    loginModal.style.display = 'block';
                }
            });
        }
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    if (typeof MagicAnimations !== 'undefined') {
                        MagicAnimations.hideModal(modal.id);
                    } else {
                        modal.style.display = 'none';
                    }
                }
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                if (typeof MagicAnimations !== 'undefined') {
                    MagicAnimations.hideModal(e.target.id);
                } else {
                    e.target.style.display = 'none';
                }
            }
        });
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        submitBtn.disabled = true;
        
        try {
            // In production, this would be a real API call
            // For demo purposes, we'll simulate authentication
            await this.simulateLogin(username, password);
            
            // Generate token (in production, this comes from server)
            const token = this.generateToken();
            
            // Store token
            localStorage.setItem('magicAdminToken', token);
            this.isAuthenticated = true;
            this.adminToken = token;
            
            // Show success animation
            this.showLoginSuccess();
            
            // Show admin features
            this.showAdminFeatures();
            
            // Close modal
            if (typeof MagicAnimations !== 'undefined') {
                MagicAnimations.hideModal('loginModal');
            } else {
                document.getElementById('loginModal').style.display = 'none';
            }
            
        } catch (error) {
            this.showLoginError(error.message);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async simulateLogin(username, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo credentials (in production, verify against database)
        const validCredentials = {
            username: 'admin',
            password: 'magic123' // In production, use proper hashing
        };
        
        if (username === validCredentials.username && 
            password === validCredentials.password) {
            return true;
        } else {
            throw new Error('Invalid credentials');
        }
    }
    
    generateToken() {
        // In production, use JWT from server
        // For demo, generate a simple token
        return 'magic_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    validateToken(token) {
        // Simple validation for demo
        // In production, verify JWT signature and expiration
        return token && token.startsWith('magic_');
    }
    
    showLoginSuccess() {
        // Create success animation
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <p>Welcome, Master Magician!</p>
        `;
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 20, 40, 0.9);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid #00ff00;
            z-index: 3000;
        `;
        
        document.body.appendChild(successMsg);
        
        // Animate
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(successMsg,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            
            // Remove after delay
            setTimeout(() => {
                gsap.to(successMsg, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => successMsg.remove()
                });
            }, 2000);
        } else {
            setTimeout(() => successMsg.remove(), 2000);
        }
    }
    
    showLoginError(message) {
        // Create error animation
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = `
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p>${message}</p>
        `;
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 50, 50, 0.9);
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 3000;
        `;
        
        document.body.appendChild(errorMsg);
        
        // Animate
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(errorMsg,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5 }
            );
            
            // Remove after delay
            setTimeout(() => {
                gsap.to(errorMsg, {
                    x: 100,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => errorMsg.remove()
                });
            }, 3000);
        } else {
            setTimeout(() => errorMsg.remove(), 3000);
        }
    }
    
    showAdminFeatures() {
        // Show upload section
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.remove('hidden');
            
            // Animate appearance
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(uploadSection,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, delay: 0.3 }
                );
            }
        }
        
        // Update login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-crown"></i> Admin Mode';
            loginBtn.classList.add('admin-active');
        }
    }
    
    logout() {
        localStorage.removeItem('magicAdminToken');
        this.isAuthenticated = false;
        this.adminToken = null;
        
        // Hide admin features
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.add('hidden');
        }
        
        // Reset login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-key"></i> Admin Login';
            loginBtn.classList.remove('admin-active');
        }
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
    
    // Add logout functionality
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (window.authSystem.isAuthenticated) {
                if (confirm('Log out from admin mode?')) {
                    window.authSystem.logout();
                }
            }
        });
    }
});
