// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // Set background to light blue

document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Load a font for the text
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    // Create the 3D text geometry
    const textGeometry1 = new THREE.TextGeometry('hzfromwork@gmail.com', {
        font: font,
        size: 1, // Size of the text
        height: 0.4, // Depth of the text
        curveSegments: 12, // Smoothness of curves
        // bevelEnabled: true, // Add bevel (chamfered edges)
        // bevelThickness: 0.1, // Depth of the bevel
        // bevelSize: 0.1, // Size of the bevel
        // bevelOffset: 0, // Offset of the bevel
        // bevelSegments: 5, // Smoothness of the bevel
    });

    const textGeometry2 = new THREE.TextGeometry('ins@wcingz', {
        font: font,
        size: 1, // Size of the text
        height: 0.4, // Depth of the text
        curveSegments: 12, // Smoothness of curves
        // bevelEnabled: true, // Add bevel (chamfered edges)
        // bevelThickness: 0.1, // Depth of the bevel
        // bevelSize: 0.1, // Size of the bevel
        // bevelOffset: 0, // Offset of the bevel
        // bevelSegments: 5, // Smoothness of the bevel
    });

    // Center the text geometry
    textGeometry1.center();
    textGeometry2.center();

    // Create a material for the text
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff, // white color
        shininess: 100, // Shiny surface
    });

    // Create a mesh with the text geometry and material
    const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
    const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
    textMesh1.position.set(0, 1, 1);
    textMesh2.position.set(0, -1, 1);
    scene.add(textMesh1);
    scene.add(textMesh2);

    // Position the camera
    camera.position.z = 20;

    // Variables for oscillating rotation
    let time = 0; // Time variable to control the oscillation
    const amplitude = Math.PI / 16; // Maximum rotation angle (45 degrees)
    const speed = 1; // Speed of oscillation

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        // Update the time variable
        time += 0.005;

        // Calculate the rotation angle using a sine function
        const angle = amplitude * Math.sin(speed * time);

        // Apply the rotation to the text
        textMesh1.rotation.y = angle;
        textMesh2.rotation.y = angle;

        // Render the scene
        renderer.render(scene, camera);
        };

    animate();
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});