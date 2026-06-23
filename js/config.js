// Get the canvas element and its drawing context.
// This is the main surface where all animations are painted.
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Stores how far the user has scrolled, from 0 to 1.
// This value controls what the scene looks like at each moment.
let scrollPercent = 0;

// Resizes the canvas to match the browser window size.
// Without this, the drawing area would stay too small or too large.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Run once at startup so the canvas is correctly sized immediately.
resizeCanvas();

// Track page scroll and update scrollPercent.
// This lets the animation react to how far down the page the user is.
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Avoid division by zero if the page height is not larger than the viewport.
    if (docHeight > 0) {
        scrollPercent = scrollTop / docHeight;
    }
});

// Blend two RGB colors using a factor between 0 and 1.
// Example: factor 0 returns the first color, factor 1 returns the second.
function blendColor(color1, color2, factor) {
    const r = Math.round(color1[0] + factor * (color2[0] - color1[0]));
    const g = Math.round(color1[1] + factor * (color2[1] - color1[1]));
    const b = Math.round(color1[2] + factor * (color2[2] - color1[2]));
    return `rgb(${r}, ${g}, ${b})`;
}