class AuthSystem {
    constructor() {
        this.isAuthenticated = false;
        this.adminToken = null;
        this.currentUser = null;
        // Use environment variable or default to localhost
        this.apiUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000/api'
            : `${window.location.protocol}//${window.location.hostname}/api`;
        this.initAuth();
    }
    
    initAuth() {
        // Check for existing session
        const token = localStorage.getItem('magicAdminToken');
        const user = localStorage.getItem('magicUser');
        
        if (token) {
            this.isAuthenticated = true;
            this.adminToken = token;
            this.currentUser = user ? JSON.parse(user) : null;
            this.verifyTokenWithBackend(token);
        }
        
        // Setup login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Setup registration form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Setup modal controls
        this.setupModalControls();
    }

    async verifyTokenWithBackend(token) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                localStorage.removeItem('magicAdminToken');
                localStorage.removeItem('magicUser');
                this.logout();
                return;
            }

            const data = await response.json();
            this.currentUser = data.user;
            localStorage.setItem('magicUser', JSON.stringify(data.user));
            this.showAdminFeatures();
        } catch (error) {
            console.error('Token verification failed:', error);
            this.logout();
        }
    }
    
    setupModalControls() {
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeBtns = document.querySelectorAll('.close');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (this.isAuthenticated) {
                    // If logged in, show logout confirmation
                    if (confirm('Log out from admin mode?')) {
                        this.logout();
                    }
                } else {
                    // Show login modal
                    if (window.MagicAnimations) {
                        MagicAnimations.showModal('loginModal');
                    } else {
                        if (loginModal) loginModal.style.display = 'block';
                    }
                }
            });
        }
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    if (window.MagicAnimations) {
                        MagicAnimations.hideModal(modal.id);
                    } else {
                        modal.style.display = 'none';
                    }
                }
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList && e.target.classList.contains('modal')) {
                if (window.MagicAnimations) {
                    MagicAnimations.hideModal(e.target.id);
                } else {
                    e.target.style.display = 'none';
                }
            }
        });
        
        // Auth tab switching
        const authTabBtns = document.querySelectorAll('.auth-tab-btn');
        authTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = btn.getAttribute('data-tab');
                
                // Update active button
                authTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active form
                const forms = document.querySelectorAll('.auth-tab-content');
                forms.forEach(form => form.classList.remove('active'));
                
                if (tab === 'login') {
                    document.getElementById('loginForm').classList.add('active');
                } else if (tab === 'register') {
                    document.getElementById('registerForm').classList.add('active');
                }
            });
        });
        
        // Set first tab as active on load
        if (authTabBtns.length > 0) {
            authTabBtns[0].classList.add('active');
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const emailField = document.getElementById('email') || document.getElementById('username');
        const passwordField = document.getElementById('password');
        
        const email = emailField.value || emailField.placeholder;
        const mongodb+srv://mrshahahmad081_db_user:<db_password>@potery01.1gmuxxl.mongodb.net/?appName=potery01s = passwordField.value;
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        submitBtn.disabled = true;
        
        try {
            // Make API call to backend
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Store token and user
            localStorage.setItem('magicAdminToken', data.token);
            localStorage.setItem('magicUser', JSON.stringify(data.user));
            this.isAuthenticated = true;
            this.adminToken = data.token;
            this.currentUser = data.user;
            
            // Show success animation
            this.showLoginSuccess(`Welcome, ${data.user.name}!`);
            
            // Show admin features
            this.showAdminFeatures();
            
            // Close modal
            if (window.MagicAnimations) {
                MagicAnimations.hideModal('loginModal');
            } else {
                const modal = document.getElementById('loginModal');
                if (modal) modal.style.display = 'none';
            }
            
            // Clear form
            e.target.reset();
            
        } catch (error) {
            this.showLoginError(error.message);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Validate
        if (!name || !email || !password) {
            this.showLoginError('All fields are required');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showLoginError('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            this.showLoginError('Password must be at least 6 characters');
            return;
        }
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${this.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Store token and user
            localStorage.setItem('magicAdminToken', data.token);
            localStorage.setItem('magicUser', JSON.stringify(data.user));
            this.isAuthenticated = true;
            this.adminToken = data.token;
            this.currentUser = data.user;
            
            // Show success
            this.showLoginSuccess(`Welcome, ${data.user.name}! Account created successfully!`);
            
            // Show admin features
            this.showAdminFeatures();
            
            // Close modal
            if (window.MagicAnimations) {
                MagicAnimations.hideModal('registerModal');
            } else {
                const modal = document.getElementById('registerModal');
                if (modal) modal.style.display = 'none';
            }
            
            // Clear form
            e.target.reset();
            
        } catch (error) {
            this.showLoginError(error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    
    showLoginSuccess(message = "Login successful!") {
        // Create success animation
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <p>${message}</p>
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
        
        // Animate if gsap is available
        if (window.gsap) {
            gsap.fromTo(successMsg,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            
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
    }
    
    showAdminFeatures() {
        // Show upload section
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.remove('hidden');
            
            // Animate appearance if gsap is available
            if (window.gsap) {
                gsap.fromTo(uploadSection,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, delay: 0.3 }
                );
            }
        }
        
        // Update login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn && this.currentUser) {
            loginBtn.innerHTML = `<i class="fas fa-crown"></i> ${this.currentUser.name || 'Admin'}`;
            loginBtn.classList.add('admin-active');
        }
    }
    
    logout() {
        localStorage.removeItem('magicAdminToken');
        localStorage.removeItem('magicUser');
        this.isAuthenticated = false;
        this.adminToken = null;
        this.currentUser = null;
        
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
        
        // Show notification
        this.showLoginSuccess('Logged out successfully');
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