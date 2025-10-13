'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition } from '@/utils/animations';
import { createMotionSafeVariants, motionSafeTransition } from '@/utils/motion';

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
    const safeVariants = createMotionSafeVariants(pageTransition);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={safeVariants}
            transition={motionSafeTransition(pageTransition.transition)}
            className={`${className} motion-reduce-safe`}
        >
            {children}
        </motion.div>
    );
}