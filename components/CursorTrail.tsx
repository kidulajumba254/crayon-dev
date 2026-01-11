
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants';

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const [marks, setMarks] = useState<{ x: number; y: number; id: number; color: string; size: number; rotation: number }[]>([]);
  const crayonColors = [COLORS.waxRed, COLORS.oceanBlue, COLORS.leafGreen, COLORS.goldenYellow];
  
  const counter = useRef(0);
  const markId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      counter.current++;
      
      // Cycle through crayon colors based on movement
      const colorIndex = Math.floor(counter.current / 5) % crayonColors.length;
      const color = crayonColors[colorIndex];

      // 1. Update immediate trail (the 'pen tip')
      const newTrailPoint = { x: e.clientX, y: e.clientY, id: counter.current, color };
      setTrail(prev => [...prev.slice(-12), newTrailPoint]);

      // 2. Spawn a 'crayon mark' splash every 6th move event to avoid cluttering performance
      if (counter.current % 6 === 0) {
        markId.current++;
        const newMark = {
          x: e.clientX,
          y: e.clientY,
          id: markId.current,
          color,
          size: Math.random() * 25 + 15,
          rotation: Math.random() * 360
        };
        
        setMarks(prev => [...prev.slice(-30), newMark]); // Limit to last 30 splashes for performance

        // Auto-remove marks after 1.8 seconds to create the 'temporary' effect
        setTimeout(() => {
          setMarks(prev => prev.filter(m => m.id !== newMark.id));
        }, 1800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none">
      {/* Background Crayon Splashes/Marks */}
      <AnimatePresence mode="popLayout">
        {marks.map((mark) => (
          <motion.div
            key={`mark-${mark.id}`}
            initial={{ opacity: 0, scale: 0.4, rotate: mark.rotation - 10 }}
            animate={{ opacity: 0.12, scale: 1, rotate: mark.rotation }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(12px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute"
            style={{
              left: mark.x,
              top: mark.y,
              width: `${mark.size}px`,
              height: `${mark.size * 0.7}px`,
              backgroundColor: mark.color,
              // Use organic irregular shape for crayon wax smudge
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(3px) url(#handDrawn)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Immediate Trail (Visual feedback of pen movement) */}
      {trail.map((point, i) => (
        <div
          key={`trail-${point.id}`}
          className="absolute"
          style={{
            left: point.x,
            top: point.y,
            width: `${8 - (i / trail.length) * 6}px`,
            height: `${8 - (i / trail.length) * 6}px`,
            backgroundColor: point.color,
            opacity: (i / trail.length) * 0.5,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
