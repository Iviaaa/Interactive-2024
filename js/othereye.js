// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // Set background to light blue

document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(200, 200, 200);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1);  // Soft ambient light
scene.add(ambientLight);

// Create the eye (a white sphere)
const eyeGeometry = new THREE.SphereGeometry(1, 32, 32);
const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,    // Light gray for the silver look
    metalness: 0.1,       // Full metallic effect
    roughness: 0.2,     // Slight roughness for a polished metal look
    transparent: true,  // Enable transparency
    opacity: 0.1
});
const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
scene.add(eye);

// Create the pupil (a smaller black sphere)
const pupilGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
pupil.position.set(0, 0, 2.5); // Position the pupil slightly to the side
eye.add(pupil);
scene.add(eye);

// Position the camera
camera.position.z = 5;

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Track mouse movement
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(mouse);
});

// Animate the pupil to follow the cursor
const animate = () => {
    requestAnimationFrame(animate);

    // Calculate the new position of the pupil based on mouse position
    const maxPupilOffset = 0.8; // Limit how far the pupil can move
    pupil.position.x = mouse.x * maxPupilOffset;
    pupil.position.y = mouse.y * maxPupilOffset;
    pupil.position.z = 2.5;

    // Ensure the pupil stays within the eye
    const pupilDistance = pupil.position.length();
    if (pupilDistance > maxPupilOffset) {
        pupil.position.normalize().multiplyScalar(maxPupilOffset);
    }

    renderer.render(scene, camera);
};

animate();