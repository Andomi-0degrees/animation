// Draws the ground-level scenery and environmental objects.
// This includes the land, birds, rabbit, car, and pool area.
class SceneryManager {
    draw(horizonY) {
        // Draw the ground area below the horizon.
        // The color smoothly shifts as the scroll position changes.
        ctx.fillStyle = blendColor([74, 222, 128], [20, 83, 45], scrollPercent);
        ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

        // Draw two birds that move across the scene.
        // The sine wave changes their flap motion.
        const birdFlap = Math.sin(scrollPercent * 240);
        ctx.strokeStyle = scrollPercent > 0.6 ? '#475569' : '#0f172a';
        ctx.lineWidth = 3;
        [[0.2, 0.1], [0.7, 0.18]].forEach(b => {
            const bx = (b[0] * canvas.width) + (scrollPercent * 300);
            const by = b[1] * canvas.height;
            ctx.beginPath();
            ctx.moveTo(bx - 14, by + birdFlap * 8);
            ctx.lineTo(bx, by);
            ctx.lineTo(bx + 14, by + birdFlap * 8);
            ctx.stroke();
        });

        // Draw a bouncing rabbit near the left side of the scene.
        const rabbitX = canvas.width * 0.15;
        const rabbitY = horizonY - 12 - Math.abs(Math.sin(scrollPercent * 120)) * 30;
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(rabbitX, rabbitY, 20, 12);
        ctx.fillRect(rabbitX + 12, rabbitY - 8, 6, 8);

        // Draw a car that loops across the screen from left to right.
        const carX = -120 + (canvas.width + 240) * ((scrollPercent * 2.2) % 1.0);
        const carY = horizonY + 35;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(carX, carY - 14, 60, 14);
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(carX + 15, carY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(carX + 45, carY, 7, 0, Math.PI * 2);
        ctx.fill();

        // Draw the pool structure in the right side of the scene.
        const poolX = canvas.width * 0.52;
        const poolY = horizonY + 70;
        const poolW = canvas.width * 0.42;
        const poolH = canvas.height * 0.25;

        // Top rim of the pool.
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(poolX, poolY);
        ctx.lineTo(poolX + poolW, poolY);
        ctx.lineTo(poolX + poolW - 40, poolY + poolH);
        ctx.lineTo(poolX - 40, poolY + poolH);
        ctx.closePath();
        ctx.fill();

        // Water inside the pool.
        ctx.fillStyle = blendColor([6, 182, 212], [8, 51, 68], scrollPercent);
        ctx.beginPath();
        ctx.moveTo(poolX + 5, poolY + 4);
        ctx.lineTo(poolX + poolW - 5, poolY + 4);
        ctx.lineTo(poolX + poolW - 42, poolY + poolH - 4);
        ctx.lineTo(poolX - 42, poolY + poolH - 4);
        ctx.closePath();
        ctx.fill();

        // Draw ripple effect on the water surface.
        const ripple = Math.sin(scrollPercent * 200) * 4;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(poolX - 15, poolY + 30, poolW - 20, 5 + ripple);
    }
}