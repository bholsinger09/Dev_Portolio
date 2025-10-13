/**
 * Performance monitoring utilities for animations
 */

// Monitor frame rate during animations
export class AnimationPerformanceMonitor {
    private frameCount = 0;
    private lastTime = 0;
    private fps = 0;
    private monitoring = false;

    start() {
        this.monitoring = true;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.measure();
    }

    stop() {
        this.monitoring = false;
        return this.fps;
    }

    private measure = () => {
        if (!this.monitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;

            // Log performance warning if FPS drops below 30
            if (this.fps < 30) {
                console.warn(`Animation performance warning: FPS dropped to ${this.fps}`);
            }
        }

        requestAnimationFrame(this.measure);
    };
}

// Test animation performance
export const testAnimationPerformance = (animationName: string) => {
    const monitor = new AnimationPerformanceMonitor();

    console.log(`Starting performance test for: ${animationName}`);
    monitor.start();

    // Stop monitoring after 3 seconds
    setTimeout(() => {
        const finalFPS = monitor.stop();
        console.log(`Animation "${animationName}" average FPS: ${finalFPS}`);
    }, 3000);

    return monitor;
};

// Check if device has hardware acceleration
export const hasHardwareAcceleration = () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
    if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
            usedJSMemory: Math.round(memory.usedJSMemory / 1048576 * 100) / 100,
            totalJSMemory: Math.round(memory.totalJSMemory / 1048576 * 100) / 100,
            jsMemoryLimit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100
        };
    }
    return null;
};