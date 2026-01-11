
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Play } from 'lucide-react';
import { Project } from '../types';
import VideoPreview from './VideoPreview';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1E1E1E]/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
          className="relative w-full max-w-2xl bg-[#FAFAF7] sketch-border p-8 md:p-12"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="p-4 sketch-border-soft"
              style={{ color: project.color }}
            >
              <Code size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-black">{project.title}</h3>
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                {project.type}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              {project.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-bold uppercase text-sm tracking-wider text-gray-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white sketch-border-soft text-sm font-bold"
                    style={{ color: project.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <VideoPreview title={project.title} color={project.color} />

            <div className="pt-8 flex gap-4">
              <a
                href={project.link}
                className="flex-1 py-4 bg-[#1E1E1E] text-white font-bold sketch-border flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Launch Project <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
