'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    offset?: number;
}

const Parallax: React.FC<ParallaxProps> = ({
    children,
    speed = 0.5,
    direction = 'up',
    className = '',
    offset = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Transform values based on direction
    const getTransform = () => {
        const range = [-offset - 100, offset + 100];

        switch (direction) {
            case 'up':
                return useTransform(scrollYProgress, [0, 1], [range[1] * speed, range[0] * speed]);
            case 'down':
                return useTransform(scrollYProgress, [0, 1], [range[0] * speed, range[1] * speed]);
            case 'left':
                return useTransform(scrollYProgress, [0, 1], [range[1] * speed, range[0] * speed]);
            case 'right':
                return useTransform(scrollYProgress, [0, 1], [range[0] * speed, range[1] * speed]);
            default:
                return useTransform(scrollYProgress, [0, 1], [range[1] * speed, range[0] * speed]);
        }
    };

    const transform = getTransform();

    const getMotionStyle = () => {
        switch (direction) {
            case 'left':
            case 'right':
                return { x: transform };
            case 'up':
            case 'down':
            default:
                return { y: transform };
        }
    };

    return (
        <motion.div
            ref={ref}
            style={getMotionStyle()}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Parallax;