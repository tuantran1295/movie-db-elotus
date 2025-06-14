import React from 'react';
import { Star, Calendar, Play } from 'lucide-react';
import { Movie, ViewMode } from '../../types/movie';
import { getPosterUrl, formatDate } from '../../utils/image';
import LazyImage from '../LazyImage/LazyImage';
import './MovieCard.scss';

interface MovieCardProps {
  movie: Movie;
  viewMode: ViewMode;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, viewMode, onClick }) => {
  const posterUrl = getPosterUrl(movie.poster_path);
  
  return (
    <div 
      className={`movie-card movie-card--${viewMode}`}
      onClick={onClick}
    >
      <div className="movie-card__poster">
        <LazyImage
          src={posterUrl}
          alt={movie.title}
          className="movie-card__image"
          skeletonVariant="poster"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__play">
            <Play size={24} />
          </div>
        </div>
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        
        <div className="movie-card__meta">
          <div className="movie-card__rating">
            <Star size={16} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          
          <div className="movie-card__date">
            <Calendar size={16} />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>
        
        {viewMode === 'list' && (
          <p className="movie-card__overview">
            {movie.overview.length > 150 
              ? `${movie.overview.substring(0, 150)}...` 
              : movie.overview
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;