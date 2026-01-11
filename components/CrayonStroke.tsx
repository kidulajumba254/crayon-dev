
import React from 'react';
import { motion } from 'framer-motion';

// Added opacity to CrayonStrokeProps to fix type errors when used in App.tsx
interface CrayonStrokeProps {
  color: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  path?: string;
  delay?: number;
  opacity?: number;
  isVertical?: boolean;
}

const CrayonStroke: React.FC<CrayonStrokeProps> = ({
  color,
  width = "100%",
  height = 12,
  className = "",
  path: customPath,
  delay = 0,
  opacity,
  isVertical = false
}) => {
  const horizontalPath = "M0 5 Q 100 0, 200 5 T 400 5";
  const verticalPath = "M5 0 Q 0 100, 5 200 T 5 400";
  const path = customPath || (isVertical ? verticalPath : horizontalPath);
  const viewBox = isVertical ? "0 0 10 400" : "0 0 400 10";

  return (
    <div className={`relative ${className}`} style={{ width, height, opacity }}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        style={{ filter: 'url(#handDrawn)' }}
      >
        {/* Pressure/Shadow Layer */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={isVertical ? "8" : "8"}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.15 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.8, ease: "easeInOut", delay }}
        />
        {/* Main Wax Layer */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={isVertical ? "5" : "5"}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: delay + 0.1 }}
        />
        {/* Texture/Grit Layer */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={isVertical ? "2" : "2"}
          strokeLinecap="round"
          strokeDasharray="1, 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: delay + 0.3 }}
        />
      </svg>
    </div>
  );
};


export default CrayonStroke;
