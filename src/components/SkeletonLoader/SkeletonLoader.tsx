import React from 'react';
import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'poster' | 'backdrop';
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  width,
  height,
  className = ''
}) => {
  const style = {
    width,
    height
  };

  return (
    <div 
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
    >
      <div className="skeleton__shimmer"></div>
    </div>
  );
};

export default SkeletonLoader;