// Draws a fast-running character.
// This one moves across the screen more quickly and keeps going.
class ActiveRunner {
    constructor() {
        // Starting position off the left side of the screen.
        this.startX = -20;
    }

    draw(horizonY) {
        // Calculate the runner position using scroll progress.
        // The runner covers the whole screen width as the scroll increases.
        const charX = this.startX + (canvas.width + 50) * Math.min(1, scrollPercent * 1.6);
        const charY = horizonY + 140;

        // Use a stronger sine wave so the legs move faster.
        const swing = Math.sin(scrollPercent * 140);

        // Legs.
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(charX - 5, charY - 14, 5, 14 + (swing * 9));
        ctx.fillRect(charX + 3, charY - 14, 5, 14 - (swing * 9));

        // Body and head.
        ctx.fillStyle = '#10b981';
        ctx.fillRect(charX - 12, charY - 44, 24, 30);
        ctx.beginPath();
        ctx.arc(charX, charY - 54, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#fbcfe8';
        ctx.fill();
    }
}