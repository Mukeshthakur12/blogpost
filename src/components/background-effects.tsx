'use client';

import { motion } from 'framer-motion';

export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, -150, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-pink-600/10 blur-[130px]"
            />
        </div>
    );
}
