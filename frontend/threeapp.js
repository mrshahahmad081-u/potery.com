class ThreeJSLogo {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('logoCanvas'),
            alpha: true,
            antialias: true 
        });
        
        this.particles = [];
        this.logoGroup = new THREE.Group();
        this.time = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(400, 400);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Setup camera
        this.camera.position.z = 5;
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x8a2be2, 0.3);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Create magical orb (main logo)
        this.createMagicalOrb();
        
        // Create particle system
        this.createParticleSystem();
        
        // Create floating runes
        this.createFloatingRunes();
        
        // Add logo group to scene
        this.scene.add(this.logoGroup);
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    createMagicalOrb() {
        // Main orb geometry
        const geometry = new THREE.IcosahedronGeometry(1, 3);
        const material = new THREE.MeshPhongMaterial({
            color: 0x8a2be2,
            emissive: 0x4a0080,
            emissiveIntensity: 0.5,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        this.orb = new THREE.Mesh(geometry, material);
        this.logoGroup.add(this.orb);
        
        // Inner glow sphere
        const innerGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3
        });
        
        this.innerGlow = new THREE.Mesh(innerGeometry, innerMaterial);
        this.logoGroup.add(this.innerGlow);
        
        // Energy rings
        const ringGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.6
        });
        
        this.ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        this.ring1.rotation.x = Math.PI / 2;
        this.logoGroup.add(this.ring1);
        
        this.ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
        this.ring2.rotation.y = Math.PI / 2;
        this.logoGroup.add(this.ring2);
    }
    
    createParticleSystem() {
        const particleCount = 500;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            // Random positions in a sphere
            const radius = 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            // Magical colors
            colors[i * 3] = Math.random() * 0.5 + 0.5;     // R
            colors[i * 3 + 1] = Math.random() * 0.3 + 0.7; // G
            colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.logoGroup.add(this.particleSystem);
    }
    
    createFloatingRunes() {
        const runeShapes = ['✦', '✧', '❖', '◈', '⬟', '⬢'];
        const loader = new THREE.FontLoader();
        
        // This is simplified - in production you'd load a proper font
        const runeGeometry = new THREE.TextGeometry('✦', {
            font: null, // Load a font file in production
            size: 0.3,
            height: 0.1
        });
        
        const runeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.7
        });
        
        for (let i = 0; i < 6; i++) {
            const rune = new THREE.Mesh(runeGeometry, runeMaterial);
            const angle = (i / 6) * Math.PI * 2;
            const radius = 2;
            
            rune.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );
            
            rune.userData.angle = angle;
            rune.userData.radius = radius;
            rune.userData.speed = 0.5 + Math.random() * 0.5;
            
            this.logoGroup.add(rune);
            this.particles.push(rune);
        }
    }
    
    onWindowResize() {
        this.camera.aspect = 1;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(400, 400);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.time += 0.01;
        
        // Rotate main orb
        if (this.orb) {
            this.orb.rotation.x = this.time * 0.5;
            this.orb.rotation.y = this.time * 0.3;
            
            // Pulsing effect
            const scale = 1 + Math.sin(this.time * 2) * 0.1;
            this.orb.scale.set(scale, scale, scale);
        }
        
        // Rotate inner glow
        if (this.innerGlow) {
            this.innerGlow.rotation.y = this.time * 0.2;
        }
        
        // Rotate rings
        if (this.ring1) {
            this.ring1.rotation.z = this.time * 0.3;
        }
        if (this.ring2) {
            this.ring2.rotation.x = this.time * 0.2;
        }
        
        // Animate particles
        if (this.particleSystem) {
            this.particleSystem.rotation.y = this.time * 0.1;
            
            const positions = this.particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(this.time + i) * 0.01;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animate runes
        this.particles.forEach((rune, i) => {
            if (rune.userData) {
                rune.userData.angle += 0.01 * rune.userData.speed;
                rune.position.x = Math.cos(rune.userData.angle) * rune.userData.radius;
                rune.position.y = Math.sin(rune.userData.angle) * rune.userData.radius;
                rune.position.z = Math.sin(this.time * 2 + i) * 0.5;
                
                rune.rotation.z = this.time;
            }
        });
        
        // Gentle camera movement
        this.camera.position.x = Math.sin(this.time * 0.1) * 0.5;
        this.camera.position.y = Math.cos(this.time * 0.1) * 0.3;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const threeLogo = new ThreeJSLogo();
    
    // Add click interaction
    const canvas = document.getElementById('logoCanvas');
    canvas.addEventListener('click', () => {
        // Create magical sparkles
        for (let i = 0; i < 20; i++) {
            createSparkle(canvas);
        }
    });
});

function createSparkle(element) {
    const spark = document.createElement('div');
    spark.className = 'magic-spark';
    
    const rect = element.getBoundingClientRect();
    spark.style.left = (rect.left + rect.width / 2) + 'px';
    spark.style.top = (rect.top + rect.height / 2) + 'px';
    
    spark.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
    spark.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
    
    document.body.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 1500);
}