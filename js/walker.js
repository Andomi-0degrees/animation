// Draws a casual walking character.
// This character slowly moves toward a stopping point as the scroll increases.
class CasualWalker {
    constructor() {
        // Starting horizontal position for the walker.
        this.startX = 50;
    }

    draw(horizonY) {
        // Move the walker closer to the center as scroll progress increases.
        const targetStopX = canvas.width * 0.48;
        const charX = this.startX + (targetStopX - this.startX) * Math.min(1, scrollPercent * 1.3);
        const charY = horizonY + 85;

        // Make the legs swing using a sine wave for a walking effect.
        const swing = Math.sin(scrollPercent * 90);

        // Left leg and right leg.
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(charX - 6, charY - 12, 4, 12 + (swing * 6));
        ctx.fillRect(charX + 2, charY - 12, 4, 12 - (swing * 6));

        // Body and head.
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(charX - 10, charY - 38, 20, 26);
        ctx.beginPath();
        ctx.arc(charX, charY - 48, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#ffedd5';
        ctx.fill();
    }
}

// Draws a falling character with a parachute.
// When the character reaches the ground, the box opens and a message rises.
class ParachuteDropper {
    constructor(xPercent = 0.5, delay = 0) {
        // Horizontal position as a percentage of the canvas width.
        this.xPercent = xPercent;

        // Delay before the parachute starts falling.
        this.delay = delay;
    }

    draw() {
        // Make the drop happen only after enough scroll progress has happened.
        const travelProgress = Math.max(0, Math.min(1, (scrollPercent - this.delay) / 0.7));
        const x = canvas.width * this.xPercent;
        const y = -100 + (canvas.height + 180) * travelProgress;
        const groundY = canvas.height - 40;

        // Once the parachute reaches the ground, the box opens.
        const isLanded = y >= groundY - 55;
        const boxProgress = Math.max(0, Math.min(1, (scrollPercent - (this.delay + 0.7)) * 2.5));

        if (!isLanded) {
            // Draw the parachute canopy.
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(x - 38, y + 8);
            ctx.lineTo(x, y - 18);
            ctx.lineTo(x + 38, y + 8);
            ctx.closePath();
            ctx.fill();

            // Draw the cords holding the parachute.
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 18, y + 8);
            ctx.lineTo(x, y + 38);
            ctx.lineTo(x + 18, y + 8);
            ctx.stroke();

            // Draw the body.
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(x - 8, y + 38, 16, 24);
            ctx.fillRect(x - 12, y + 62, 24, 8);
        } else {
            // Draw the opened box.
            ctx.fillStyle = '#8b5a2b';
            ctx.fillRect(x - 26, groundY - 24, 52, 24);
            ctx.fillStyle = '#d4a373';
            ctx.fillRect(x - 18, groundY - 35, 36, 12);

            // Draw the box lid opening upward.
            ctx.fillStyle = '#c08457';
            ctx.fillRect(x - 34, groundY - 50, 68, 12);
            ctx.fillRect(x - 34, groundY - 50, 68, 4);

            // Make the message appear from the box area, move upward, and grow smoothly.
            const messageScale = Math.min(1, boxProgress * 1.4);
            const messageSize = 14 + messageScale * 46;
            const messageStartY = groundY - 8;
            const messageEndY = canvas.height * 0.28;
            const messageY = messageStartY - (messageStartY - messageEndY) * messageScale;

            ctx.save();
            ctx.globalAlpha = Math.min(1, messageScale * 1.1);
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${messageSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Thank you', x, messageY);
            ctx.restore();
        }
    }
}