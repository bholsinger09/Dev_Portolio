'use client';

import { useRef } from 'react';
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

    // Transform values based on direction - moved hooks to component level
    const range = [-offset - 100, offset + 100];
    
    const transformUp = useTransform(scrollYProgress, [0, 1], [range[1] * speed, range[0] * speed]);
    const transformDown = useTransform(scrollYProgress, [0, 1], [range[0] * speed, range[1] * speed]);
    const transformLeft = useTransform(scrollYProgress, [0, 1], [range[1] * speed, range[0] * speed]);
    const transformRight = useTransform(scrollYProgress, [0, 1], [range[0] * speed, range[1] * speed]);

    // Select the appropriate transform based on direction
    const getTransform = () => {
        switch (direction) {
            case 'up':
                return transformUp;
            case 'down':
                return transformDown;
            case 'left':
                return transformLeft;
            case 'right':
                return transformRight;
            default:
                return transformUp;
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