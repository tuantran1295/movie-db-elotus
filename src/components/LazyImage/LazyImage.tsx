import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import './LazyImage.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonVariant?: 'card' | 'poster' | 'backdrop';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  skeletonVariant = 'poster',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      ref={targetRef} 
      className={`lazy-image ${className}`}
    >
      {!isLoaded && !hasError && (
        <SkeletonLoader variant={skeletonVariant} />
      )}
      
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: hasError ? 'none' : 'block'
          }}
        />
      )}
      
      {hasError && (
        <div className="lazy-image__error">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;