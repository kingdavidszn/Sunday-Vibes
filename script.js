// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Three.js Scene Setup for background particles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('canvas-container');

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 3;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.003,
    color: '#ff6b6b',
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Animation
const animate = () => {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0003;
    particlesMesh.rotation.y += 0.0003;
    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// GSAP Animations
gsap.from('.feature', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    delay: 0.5,
    ease: 'power2.out'
});

gsap.from('.about-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.about',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.activity-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.activities',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.contact-intro', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.contact-form', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: 'power2.inOut'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Form submission with enhanced animation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add animation to button
    const button = form.querySelector('button');
    gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    // Create and animate success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for sharing your Sunday story!';
    successMessage.style.color = '#ff6b6b';
    successMessage.style.marginTop = '20px';
    successMessage.style.textAlign = 'center';
    successMessage.style.opacity = '0';
    
    form.appendChild(successMessage);
    
    gsap.to(successMessage, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    form.reset();
    
    // Remove success message with animation
    setTimeout(() => {
        gsap.to(successMessage, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => successMessage.remove()
        });
    }, 3000);
});

// Image Carousel
class ImageCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.currentSlide = 0;
        this.images = []; // Will be populated with your image URLs
        this.interval = null;
        this.autoPlayDelay = 4000; // 4 seconds between slides
        this.isTransitioning = false;

        this.init();
    }

    init() {
        // Add placeholder image URLs for testing
        this.images = [
            { url: 'https://img.freepik.com/free-photo/young-adult-having-fun-white-party_23-2149575175.jpg?t=st=1746829027~exp=1746832627~hmac=257bc31bb6a43f55b9fcbdc56ed2571d41dd96a0ce7725971fd8519ef5023cae&w=996', caption: 'Peaceful Sunday Morning' },
            { url: 'https://img.freepik.com/free-photo/full-shot-woman-reading-home_23-2150170919.jpg?t=st=1746828718~exp=1746832318~hmac=46598d8624267160a0b6695fc7e53f7a50efa587eb1616b38ebaa977909adcbf&w=996', caption: 'Cozy Reading Time' },
            { url: 'https://img.freepik.com/free-photo/side-view-guy-with-headphones-coffee-cup_23-2148328979.jpg?t=st=1746828886~exp=1746832486~hmac=502179ccf764d6f61ebd540f0a3f6c2930b2e59b2eebe7e29e4b27f38ced8133&w=996', caption: 'Nature Walk' },
        ];

        this.createSlides();
        this.setupEventListeners();
        this.startAutoPlay();
    }

    createSlides() {
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${image.url}" alt="Sunday Activity">
                <div class="carousel-caption">${image.caption}</div>
            `;
            this.container.appendChild(slide);
        });
    }

    setupEventListeners() {
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.currentSlide = index;
        this.updateCarousel();
        
        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    updateCarousel() {
        // Update slide position with smooth transition
        this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.interval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }
}

// Three Crosses Animation
const initThreeCrosses = () => {
    // Create a new container for the crosses scene
    const crossesContainer = document.createElement('div');
    crossesContainer.id = 'crosses-container';
    crossesContainer.style.position = 'absolute';
    crossesContainer.style.top = '0';
    crossesContainer.style.right = '0';
    crossesContainer.style.width = '50%';
    crossesContainer.style.height = '100%';
    crossesContainer.style.zIndex = '2';
    crossesContainer.style.pointerEvents = 'none';
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(crossesContainer);
    }
    
    // Create scene, camera, renderer
    const crossesScene = new THREE.Scene();
    const crossesCamera = new THREE.PerspectiveCamera(75, crossesContainer.clientWidth / crossesContainer.clientHeight, 0.1, 1000);
    const crossesRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    crossesRenderer.setSize(crossesContainer.clientWidth, crossesContainer.clientHeight);
    crossesRenderer.setClearColor(0x000000, 0);
    crossesContainer.appendChild(crossesRenderer.domElement);
    
    // Set camera position
    crossesCamera.position.z = 6;
    crossesCamera.position.y = 1;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    crossesScene.add(ambientLight);
    
    // Create cross
    const createCross = () => {
        const crossGroup = new THREE.Group();
        
        // Vertical beam
        const verticalGeometry = new THREE.BoxGeometry(0.8, 3.5, 0.4);
        // Horizontal beam
        const horizontalGeometry = new THREE.BoxGeometry(2, 0.6, 0.5);
        
        // Material with bright color
        const crossMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Bright gold color
            roughness: 0.3,
            metalness: 0.8,
            emissive: 0xffd700,
            emissiveIntensity: 0.2
        });
        
        const verticalBeam = new THREE.Mesh(verticalGeometry, crossMaterial);
        const horizontalBeam = new THREE.Mesh(horizontalGeometry, crossMaterial);
        
        horizontalBeam.position.y = 1;
        
        crossGroup.add(verticalBeam);
        crossGroup.add(horizontalBeam);
        
        return crossGroup;
    };
    
    // Create single cross
    const cross = createCross();
    crossesScene.add(cross);

    // Create birds
    const createBird = () => {
        const birdGroup = new THREE.Group();
        
        // Bird body
        const bodyGeometry = new THREE.SphereGeometry(0.2, 8, 8); // Doubled size
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.8,
            metalness: 0.2
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        
        // Bird wings
        const wingGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.02); // Doubled size
        const wingMaterial = new THREE.MeshStandardMaterial({
            color: 0x666666,
            roughness: 0.8,
            metalness: 0.2
        });
        
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        
        leftWing.position.set(-0.2, 0, 0); // Adjusted for larger size
        rightWing.position.set(0.2, 0, 0); // Adjusted for larger size
        
        birdGroup.add(body);
        birdGroup.add(leftWing);
        birdGroup.add(rightWing);
        
        return birdGroup;
    };
    
    // Create multiple birds
    const birds = [];
    for (let i = 0; i < 5; i++) {
        const bird = createBird();
        bird.position.set(
            Math.random() * 20 - 10,
            Math.random() * 5 + 5,
            Math.random() * 10 - 15
        );
        bird.rotation.y = Math.PI / 2;
        birds.push(bird);
        crossesScene.add(bird);
    }
    
    // Animation loop
    const animateCrosses = () => {
        requestAnimationFrame(animateCrosses);
        
        cross.rotation.y = Math.sin(Date.now() * 0.0002) * 0.03;
        
        // Animate birds
        birds.forEach((bird, index) => {
            // Move birds
            bird.position.x += 0.05;
            if (bird.position.x > 15) {
                bird.position.x = -15;
                bird.position.y = Math.random() * 5 + 5;
                bird.position.z = Math.random() * 10 - 15;
            }
            
            // Animate wings
            const wingSpeed = 0.1;
            const wingAngle = Math.sin(Date.now() * 0.01 + index) * 0.5;
            bird.children[1].rotation.z = wingAngle; // Left wing
            bird.children[2].rotation.z = -wingAngle; // Right wing
        });
        
        crossesRenderer.render(crossesScene, crossesCamera);
    };
    
    // Handle window resize
    const handleResize = () => {
        crossesCamera.aspect = crossesContainer.clientWidth / crossesContainer.clientHeight;
        crossesCamera.updateProjectionMatrix();
        crossesRenderer.setSize(crossesContainer.clientWidth, crossesContainer.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // GSAP animations
    gsap.set(cross.position, { y: -10 });
    
    const tl = gsap.timeline({ delay: 1 });
    
    tl.to(cross.position, {
        y: 0,
        duration: 1.5,
        ease: "power3.out"
    });
    
    animateCrosses();
    
    return {
        container: crossesContainer,
        scene: crossesScene,
        destroy: () => {
            window.removeEventListener('resize', handleResize);
            crossesContainer.remove();
            crossesScene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            crossesRenderer.dispose();
        }
    };
};

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    // Initialize carousel
    new ImageCarousel();
    
    // Initialize Three Crosses with a longer delay to ensure other elements are loaded
    setTimeout(() => {
        const crossesScene = initThreeCrosses();
        console.log("Three Crosses initialized");
    }, 1000);
});