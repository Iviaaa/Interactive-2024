const canvas = document.getElementById('curvedTextCanvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ctx = canvas.getContext('2d');
const text = "Hi! I am a computer scientist turned graphic designer, who mainly works with interactive and dynamic graphics. [click to generate new visual]";
const letterSpacing = 15; // Spacing between each letter

let currentLength = 0;
let animationFrameId = null;
let lastTime = 0;  // Track time for pauses
const letterDelay = 70; // Delay between each letter in milliseconds
let isAnimating = false;

// Generate random points for the curve
let points = Array.from({ length: 30 }, () => ({
    x: Math.min(Math.max(100, Math.random() * (canvas.width)), canvas.width - 100),
    y: Math.min(Math.max(100, Math.random() * (canvas.height)), canvas.height - 100),
}));

// Function to interpolate points (Catmull-Rom Spline)
function getInterpolatedPoint(t, p0, p1, p2, p3) {
    const tt = t * t;
    const ttt = tt * t;
    return {
        x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * ttt),
        y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * ttt),
    };
}

// Get the curve points
function getCurvePoints(steps = 20) {
    let curvePoints = [];
    for (let i = 1; i < points.length - 2; i++) {
        for (let t = 0; t < 1; t += 1 / steps) {
            curvePoints.push(getInterpolatedPoint(t, points[i - 1], points[i], points[i + 1], points[i + 2]));
        }
    }
    return curvePoints;
}

function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}


// Draw the text along the curve
function drawTextOnPath(curvePoints, timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Arial Narrow"; //Times New Roman?teletactileRus?
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'; // Shadow color (black with 50% opacity)
    ctx.shadowBlur = 3; // Blur amount
    ctx.shadowOffsetX = 3; // Horizontal shadow offset
    ctx.shadowOffsetY = 2; // Vertical shadow offset

    let currentOffset = 0;
    let previousPoint = curvePoints[0];
    let reachedClick = false;

    for (let i = 0; i < currentLength; i++) {
        for (let j = currentOffset; j < curvePoints.length; j++) {
            const point = curvePoints[j];
            if (!point) break;

            const letterWidth = ctx.measureText(text[i]).width;
            const dist = distance(previousPoint, point);
            if (text[i]=='['){
                reachedClick = true;
            }

            if(reachedClick) ctx.fillStyle= "rgb(252,15,192)";
            else{ctx.fillStyle= "blue";}
        

            if (dist >= letterWidth + 10) {  // Ensure enough space before placing the letter
                const nextPoint = curvePoints[Math.min(j + 1, curvePoints.length - 1)];
                if (!nextPoint) break;
                const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);

                ctx.save();
                ctx.translate(point.x, point.y);
                ctx.rotate(angle);
                ctx.fillText(text[i], -letterWidth / 2, 0);
                ctx.restore();

                currentOffset = j;
                previousPoint = point;
                break;
            }
        }
    }
    

    if (currentLength < text.length) {
     // Pause logic based on timestamp
        if (timestamp - lastTime >= letterDelay) {
            currentLength++;
            lastTime = timestamp;  // Update the lastTime after each letter
        }
            animationFrameId = requestAnimationFrame((timestamp) => drawTextOnPath(curvePoints, timestamp));
        } else {
        isAnimating = false; // Animation completed
        // requestAnimationFrame(() => drawTextOnPath(curvePoints));
    }
}



// Event listener to restart the animation on mouse click
document.body.addEventListener('click', () => {
    if (isAnimating) {
        cancelAnimationFrame(animationFrameId);
        isAnimating = false;
    }   
    points = Array.from({ length: 25 }, () => ({
        x: Math.min(Math.max(200, Math.random() * (canvas.width)), canvas.width - 200),
        y: Math.min(Math.max(200, Math.random() * (canvas.height)), canvas.height - 200),
    }));
    curvePoints = getCurvePoints();
    currentLength = 0; // Reset the letter counter
    drawTextOnPath(curvePoints); // Restart the animation
});

// Start drawing
let curvePoints = getCurvePoints();
drawTextOnPath(curvePoints);