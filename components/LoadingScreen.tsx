import React from 'react';
import { motion } from 'framer-motion';
import CrayonStroke from './CrayonStroke';
import { COLORS } from '../constants';

const LoadingScreen: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#FAFAF7] flex flex-col items-center justify-center p-10 overflow-hidden"
        >
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl md:text-8xl font-black mb-12 relative px-10 py-6"
                >
                    JESSE<span className="text-[#E94B3C]">.</span>KIDULA
                    <CrayonStroke color={COLORS.goldenYellow} className="absolute -bottom-2 left-0" width="100%" height={24} />
                </motion.div>

                <div className="absolute -top-10 -right-10 rotate-12">
                    <motion.div
                        animate={{ rotate: [12, -12, 12] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-handwriting text-3xl text-gray-400"
                    >
                        Sketching... ✍️
                    </motion.div>
                </div>
            </div>

            <div className="w-64 h-1 bg-gray-100 rounded-full relative overflow-hidden mt-10">
                <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full bg-[#2E86DE]"
                />
                <CrayonStroke color={COLORS.oceanBlue} className="absolute inset-0 opacity-50" width="100%" />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 font-black uppercase tracking-[0.5em] text-xs text-gray-300"
            >
                Initializing Engineering Workspace
            </motion.p>

            {/* Decorative scribbles */}
            <CrayonStroke color={COLORS.waxRed} className="absolute top-20 left-1/4 -rotate-12 opacity-5" width={300} />
            <CrayonStroke color={COLORS.leafGreen} className="absolute bottom-20 right-1/4 rotate-12 opacity-5" width={400} />
        </motion.div>
    );
};

export default LoadingScreen;
