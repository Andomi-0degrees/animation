// Wait until the HTML is fully loaded before running the animation code.
// This ensures all canvas and script elements are ready to use.
document.addEventListener('DOMContentLoaded', () => {
    // Create the scene objects that will draw different parts of the animation.
    const sky = new SkyManager();
    const scenery = new SceneryManager();
    const parachute = new ParachuteDropper(0.5, 0.05);
    const characterOne = new CasualWalker();
    const characterTwo = new ActiveRunner();

    // Main drawing function.
    // It calculates the horizon and then asks each object to draw itself.
    function masterRenderLoop() {
        const horizonLine = canvas.height * 0.55;

        // Draw the background first, then the scenery, then the parachute scene,
        // and finally the walking/running characters.
        sky.draw();
        scenery.draw(horizonLine);
        parachute.draw();
        characterOne.draw(horizonLine);
        characterTwo.draw(horizonLine);
    }

    // Redraw the scene whenever the browser window changes size.
    window.addEventListener('resize', () => {
        resizeCanvas();
        masterRenderLoop();
    });

    // Redraw whenever the user scrolls.
    // This keeps the animation in sync with the scroll position.
    window.addEventListener('scroll', () => {
        masterRenderLoop();
    });

    // Run the animation once immediately when the page loads.
    masterRenderLoop();
});