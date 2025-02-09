// Scene, Camera, Renderer
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Shader Code
const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    int x, y;
    #define D(C, R) if (x == C) return R / 64.;

    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float bayer(vec2 rc) {
        x = int(mod(rc.x, 8.));
        y = int(mod(rc.y, 8.));
        if (y == 0) { D(0, 0.) D(1, 32.) D(2, 8.) D(3, 40.) D(4, 2.) D(5, 34.) D(6, 10.) D(7, 42.) }
        else if (y == 1) { D(0, 48.) D(1, 16.) D(2, 56.) D(3, 24.) D(4, 50.) D(5, 18.) D(6, 58.) D(7, 26.) }
        else if (y == 2) { D(0, 12.) D(1, 44.) D(2, 4.) D(3, 36.) D(4, 14.) D(5, 46.) D(6, 6.) D(7, 38.) }
        else if (y == 3) { D(0, 60.) D(1, 28.) D(2, 52.) D(3, 20.) D(4, 62.) D(5, 30.) D(6, 54.) D(7, 22.) }
        else if (y == 4) { D(0, 3.) D(1, 35.) D(2, 11.) D(3, 43.) D(4, 1.) D(5, 33.) D(6, 9.) D(7, 41.) }
        else if (y == 5) { D(0,51.) D(1,19.) D(2,59.) D(3,27.) D(4,49.) D(5,97.) D(6,57.) D(7,25.)}
        else if (y == 6) { D(0, 15.) D(1, 47.) D(2, 7.) D(3, 39.) D(4, 13.) D(5, 45.) D(6, 5.) D(7, 37.) }
        else if (y == 7) { D(0, 63.) D(1, 31.) D(2, 55.) D(3, 23.) D(4, 61.) D(5, 29.) D(6, 53.) D(7, 21.) }
    }


    void main( void ) {
    float t = time * 0.91;
    vec2 r = resolution,
    o = (gl_FragCoord.xy - r/2.)*1.;
    o = vec2(length(o) / r.y - .8, atan(o.y,o.x));

     // 使用噪声扰动生成不规则的形状
    float noiseStrength = 0.5;
    float n = noise(o * 5.0 + t * 0.1);  // 生成随时间变化的噪声
    o.x += n * noiseStrength;
    o.y += n * noiseStrength;

    vec4 s = 0.08*cos(1.5*vec4(0,1,2,3) + t + o.y + sin(o.y) * cos(t)),
    e = s.yzwx, 
    f = max(o.x-s,e-o.x);

    vec4 color = dot(clamp(f*r.y,0.,1.), 72.*(s-e)) * (s-.1) + f;
        
    float threshold = bayer(gl_FragCoord.xy);
    float pr = step(threshold, float(color.g));
    float pg = step(threshold, float(color.g));
    float pb = step(threshold, float(color.g));
        
    gl_FragColor = vec4(pr,pg,pb, 1.0);
    }
`;

// Shader Material
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
});

// Create a Plane Geometry
const geometry = new THREE.PlaneGeometry(2, 2); // Full-screen quad
const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);

// Camera Position
camera.position.z = 1;

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    // Update time uniform
    shaderMaterial.uniforms.time.value = clock.getElapsedTime();

    // Render the scene
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    shaderMaterial.uniforms.resolution.value.set(width, height);
});