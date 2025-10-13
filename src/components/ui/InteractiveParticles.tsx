'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    targetX?: number;
    targetY?: number;
    connected: boolean;
    color: string;
}

interface MousePosition {
    x: number;
    y: number;
}

const InteractiveParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(true);

    // Configuration
    const config = {
        particleCount: 60,
        maxDistance: 120,
        mouseRadius: 150,
        particleSpeed: 0.5,
        colors: [
            'rgba(59, 130, 246, 0.6)',   // Blue
            'rgba(147, 51, 234, 0.6)',   // Purple
            'rgba(16, 185, 129, 0.6)',   // Emerald
            'rgba(245, 158, 11, 0.6)',   // Amber
            'rgba(239, 68, 68, 0.6)',    // Red
        ]
    };

    // Initialize particles
    const initializeParticles = useCallback(() => {
        const particles: Particle[] = [];
        const { width, height } = dimensions;

        for (let i = 0; i < config.particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * config.particleSpeed,
                vy: (Math.random() - 0.5) * config.particleSpeed,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                connected: false,
                color: config.colors[Math.floor(Math.random() * config.colors.length)]
            });
        }

        particlesRef.current = particles;
    }, [dimensions, config.particleCount, config.particleSpeed, config.colors]);

    // Update particle positions and interactions
    const updateParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const particles = particlesRef.current;
        const mouse = mouseRef.current;
        const { width, height } = dimensions;

        particles.forEach((particle) => {
            // Mouse interaction - attract particles to mouse
            const mouseDistance = Math.sqrt(
                Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2)
            );

            if (mouseDistance < config.mouseRadius) {
                const force = (config.mouseRadius - mouseDistance) / config.mouseRadius;
                const angle = Math.atan2(mouse.y - particle.y, mouse.x - particle.x);

                // Attract towards mouse with some randomness
                particle.vx += Math.cos(angle) * force * 0.02;
                particle.vy += Math.sin(angle) * force * 0.02;

                // Increase opacity when near mouse
                particle.opacity = Math.min(1, particle.opacity + force * 0.02);
            } else {
                // Return to normal opacity
                particle.opacity = Math.max(0.2, particle.opacity - 0.01);
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add some friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Boundary collision with slight randomness
            if (particle.x < 0 || particle.x > width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(width, particle.x));
            }
            if (particle.y < 0 || particle.y > height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(height, particle.y));
            }

            // Add slight random movement
            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;

            // Speed limit
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }
        });
    }, [dimensions, config.mouseRadius]);

    // Draw particles and connections
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;

        // Draw connections
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.maxDistance) {
                    const opacity = 1 - (distance / config.maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

            // Create gradient for particle
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Add glow effect for particles near mouse
            const mouseDistance = Math.sqrt(
                Math.pow(mouseRef.current.x - particle.x, 2) +
                Math.pow(mouseRef.current.y - particle.y, 2)
            );

            if (mouseDistance < config.mouseRadius) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                const glowGradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
                glowGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = glowGradient;
                ctx.fill();
            }
        });
    }, [config.maxDistance, config.mouseRadius]);

    // Animation loop
    const animate = useCallback(() => {
        updateParticles();
        draw();
        animationRef.current = requestAnimationFrame(animate);
    }, [updateParticles, draw]);

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Handle window resize
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Hide on mobile for performance
    useEffect(() => {
        const checkMobile = () => {
            setIsVisible(window.innerWidth >= 768 && !('ontouchstart' in window));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize and start animation
    useEffect(() => {
        if (!isVisible || dimensions.width === 0 || dimensions.height === 0) return;

        initializeParticles();
        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dimensions, isVisible, initializeParticles, animate]);

    if (!isVisible) return null;

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: 'transparent',
            }}
        />
    );
};

export default InteractiveParticles;