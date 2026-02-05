class UploadSystem {
    constructor() {
        this.currentTab = 'image';
        this.selectedFile = null;
        this.initUploadSystem();
    }
    
    initUploadSystem() {
        // Tab switching
        this.setupTabs();
        
        // File input handling
        this.setupFileInputs();
        
        // Form submission
        const uploadForm = document.getElementById('uploadForm');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        }
        
        // Upload button click
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                if (window.authSystem && window.authSystem.isAuthenticated) {
                    if (typeof MagicAnimations !== 'undefined') {
                        MagicAnimations.showModal('uploadModal');
                    } else {
                        document.getElementById('uploadModal').style.display = 'block';
                    }
                } else {
                    if (typeof MagicAnimations !== 'undefined') {
                        MagicAnimations.showModal('loginModal');
                    } else {
                        document.getElementById('loginModal').style.display = 'block';
                    }
                }
            });
        }
    }
    
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add('active');
                    }
                });
                
                this.currentTab = tabId;
            });
        });
    }
    
    setupFileInputs() {
        const imageInput = document.getElementById('imageUpload');
        const videoInput = document.getElementById('videoUpload');
        
        if (imageInput) {
            imageInput.addEventListener('change', (e) => this.previewImage(e));
        }
        
        if (videoInput) {
            videoInput.addEventListener('change', (e) => this.previewVideo(e));
        }
    }
    
    previewImage(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        this.selectedFile = file;
        const preview = document.getElementById('imagePreview');
        
        if (preview) {
            preview.innerHTML = '';
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.borderRadius = '10px';
                preview.appendChild(img);
                
                // Add magical effect to preview
                this.addMagicalFrame(img);
            };
            reader.readAsDataURL(file);
        }
    }
    
    previewVideo(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        this.selectedFile = file;
        const preview = document.getElementById('videoPreview');
        
        if (preview) {
            preview.innerHTML = '';
            
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.borderRadius = '10px';
            preview.appendChild(video);
        }
    }
    
    addMagicalFrame(element) {
        // Add glow effect
        element.style.boxShadow = '0 0 20px var(--primary-glow)';
        
        // Add animated border
        const border = document.createElement('div');
        border.style.cssText = `
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border: 2px solid transparent;
            border-radius: 12px;
            background: linear-gradient(45deg, #8a2be2, #00ffff, #ff00ff) border-box;
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: rotate 3s linear infinite;
        `;
        
        element.parentNode.style.position = 'relative';
        element.parentNode.appendChild(border);
    }
    
    async handleUpload(e) {
        e.preventDefault();
        
        if (!window.authSystem.isAuthenticated) {
            alert('Please login as admin to upload content');
            if (typeof MagicAnimations !== 'undefined') {
                MagicAnimations.showModal('loginModal');
            } else {
                document.getElementById('loginModal').style.display = 'block';
            }
            return;
        }
        
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enchanting...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData();
            
            switch (this.currentTab) {
                case 'image':
                    if (!this.selectedFile) {
                        throw new Error('Please select an image');
                    }
                    formData.append('type', 'image');
                    formData.append('file', this.selectedFile);
                    formData.append('title', 'Uploaded Image');
                    break;
                    
                case 'poetry':
                    const poetryText = document.getElementById('poetryText').value;
                    const poetryTitle = document.getElementById('poetryTitle').value;
                    
                    if (!poetryText.trim()) {
                        throw new Error('Please write some poetry');
                    }
                    
                    formData.append('type', 'poetry');
                    formData.append('title', poetryTitle || 'Untitled Poetry');
                    formData.append('content', poetryText);
                    break;
                    
                case 'video':
                    if (!this.selectedFile) {
                        throw new Error('Please select a video');
                    }
                    formData.append('type', 'video');
                    formData.append('file', this.selectedFile);
                    formData.append('title', 'Uploaded Video');
                    break;
            }
            
            // In production, send to backend API
            await this.sendToBackend(formData);
            
            // Show success
            this.showUploadSuccess();
            
            // Reset form
            this.resetForm();
            
            // Close modal after delay
            setTimeout(() => {
                if (typeof MagicAnimations !== 'undefined') {
                    MagicAnimations.hideModal('uploadModal');
                } else {
                    document.getElementById('uploadModal').style.display = 'none';
                }
            }, 1500);
            
        } catch (error) {
            this.showUploadError(error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async sendToBackend(formData) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In production, make actual fetch request:
        /*
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${window.authSystem.adminToken}`
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        return response.json();
        */
        
        // For demo, return simulated success
        return { success: true, id: Date.now() };
    }
    
    showUploadSuccess() {
        // Create magical success effect
        const successEffect = document.createElement('div');
        successEffect.className = 'upload-success';
        successEffect.innerHTML = `
            <div class="success-star">
                <i class="fas fa-star"></i>
            </div>
            <p>Content Enchanted Successfully!</p>
        `;
        
        successEffect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 4000;
        `;
        
        document.body.appendChild(successEffect);
        
        // Animate stars
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(successEffect,
                { scale: 0, rotation: -180 },
                { 
                    scale: 1, 
                    rotation: 0, 
                    duration: 0.8, 
                    ease: "elastic.out(1, 0.5)" 
                }
            );
            
            // Create surrounding particles
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.innerHTML = '<i class="fas fa-sparkle"></i>';
                particle.style.cssText = `
                    position: absolute;
                    color: #ff00ff;
                    font-size: 20px;
                    opacity: 0;
                `;
                
                successEffect.appendChild(particle);
                
                const angle = (i / 12) * Math.PI * 2;
                const radius = 100;
                
                gsap.to(particle, {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    rotation: 360,
                    opacity: 1,
                    duration: 1,
                    delay: i * 0.05,
                    ease: "power2.out"
                });
            }
            
            // Remove after animation
            setTimeout(() => {
                gsap.to(successEffect, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => successEffect.remove()
                });
            }, 2000);
        } else {
            setTimeout(() => successEffect.remove(), 2000);
        }
    }
    
    showUploadError(message) {
        const errorEffect = document.createElement('div');
        errorEffect.innerHTML = `
            <div style="color: #ff5555; font-size: 24px; margin-bottom: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p>${message}</p>
        `;
        
        errorEffect.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 50, 50, 0.9);
            padding: 20px;
            border-radius: 10px;
            z-index: 4000;
        `;
        
        document.body.appendChild(errorEffect);
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(errorEffect,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5 }
            );
            
            setTimeout(() => {
                gsap.to(errorEffect, {
                    x: 100,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => errorEffect.remove()
                });
            }, 3000);
        } else {
            setTimeout(() => errorEffect.remove(), 3000);
        }
    }
    
    resetForm() {
        // Clear file inputs
        const imageUpload = document.getElementById('imageUpload');
        const videoUpload = document.getElementById('videoUpload');
        const poetryText = document.getElementById('poetryText');
        const poetryTitle = document.getElementById('poetryTitle');
        
        if (imageUpload) imageUpload.value = '';
        if (videoUpload) videoUpload.value = '';
        if (poetryText) poetryText.value = '';
        if (poetryTitle) poetryTitle.value = '';
        
        // Clear previews
        const previews = document.querySelectorAll('.preview');
        previews.forEach(preview => {
            preview.innerHTML = '';
        });
        
        this.selectedFile = null;
    }
}

// Initialize upload system
document.addEventListener('DOMContentLoaded', () => {
    window.uploadSystem = new UploadSystem();
});
