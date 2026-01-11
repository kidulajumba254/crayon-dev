import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import CrayonStroke from './CrayonStroke';
import { COLORS } from '../constants';

interface VideoPreviewProps {
    title: string;
    color: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ title, color }) => {
    return (
        <div className="mt-12 group cursor-pointer">
            <div className="flex items-center gap-6 mb-4">
                <div className="w-2 h-8" style={{ backgroundColor: color }} />
                <h4 className="text-xl font-black uppercase tracking-widest text-gray-400">Next Up: Visual Briefing</h4>
            </div>

            <div className="relative aspect-video bg-gray-900 sketch-border overflow-hidden flex items-center justify-center">
                {/* Grayscale background simulation */}
                <div className="absolute inset-0 opacity-20 grayscale bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />

                {/* Play Button */}
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center sketch-border-soft"
                >
                    <Play size={32} className="text-white fill-white opacity-80" />
                </motion.div>

                {/* Crayon "COMING SOON" Badge */}
                <motion.div
                    initial={{ rotate: -5, scale: 0.9 }}
                    animate={{ rotate: [-5, 5, -5], scale: [0.9, 1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                    <div className="bg-[#E94B3C] text-white px-8 py-4 sketch-border font-handwriting text-3xl shadow-2xl whitespace-nowrap rotate-[-12deg]">
                        Coming Soon! ✨
                        <CrayonStroke color="#FAFAF7" className="absolute -bottom-2 left-2" width={100} height={10} />
                    </div>
                </motion.div>

                {/* Progress Bar (YouTube Style) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "30%" }}
                        className="h-full bg-[#E94B3C]"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-2xl font-black leading-tight group-hover:text-[#2E86DE] transition-colors line-clamp-2">
                        Video Demo: {title} Architecture & Workflow
                    </p>
                    <p className="text-gray-400 font-bold mt-2 font-handwriting">Drafting in progress... ✍️</p>
                </div>
                <div className="ml-4 px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-sm self-start">
                    PREVIEW
                </div>
            </div>
        </div>
    );
};

export default VideoPreview;
