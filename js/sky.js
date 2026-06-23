// Controls the background sky and lighting.
// This class changes the scene color, adds stars, and draws the sun/moon.
class SkyManager {
    constructor() {
        // Fixed positions for the stars, measured as percentages of the canvas.
        this.stars = [[0.1, 0.15], [0.35, 0.1], [0.65, 0.25], [0.85, 0.12]];
    }

    draw() {
        // Fill the whole canvas with a color that shifts from day to night.
        ctx.fillStyle = blendColor([56, 189, 248], [15, 23, 42], scrollPercent);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add stars only when the scroll position is far enough down.
        if (scrollPercent > 0.4) {
            // Make the stars become more visible as the scroll continues.
            ctx.fillStyle = `rgba(255, 255, 255, ${(scrollPercent - 0.4) * 2.5})`;
            this.stars.forEach(p => {
                ctx.beginPath();
                ctx.arc(p[0] * canvas.width, p[1] * canvas.height, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Calculate the sun/moon position using the current scroll progress.
        const centerX = canvas.width * 0.15 + (canvas.width * 0.7 * scrollPercent);
        const arcY = canvas.height * 0.45 - Math.sin(scrollPercent * Math.PI) * (canvas.height * 0.35);

        // Draw the sun while the scene is still in the early part of the scroll.
        if (scrollPercent < 0.65) {
            ctx.fillStyle = `rgba(253, 224, 71, ${Math.max(0, 1 - (scrollPercent * 1.8))})`;
            ctx.beginPath();
            ctx.arc(centerX, arcY, 45, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw the moon once the scene reaches the later part of the scroll.
        if (scrollPercent > 0.35) {
            ctx.fillStyle = `rgba(241, 245, 249, ${Math.min(1, (scrollPercent - 0.35) * 2.5)})`;
            ctx.beginPath();
            ctx.arc(centerX, arcY, 35, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}