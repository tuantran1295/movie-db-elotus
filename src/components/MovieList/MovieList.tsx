import React from 'react';
import { Movie, ViewMode } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import './MovieList.scss';

interface MovieListProps {
  movies: Movie[];
  viewMode: ViewMode;
  isLoading: boolean;
  onMovieClick: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  viewMode,
  isLoading,
  onMovieClick
}) => {
  const renderSkeletons = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <div key={index} className={`skeleton-item skeleton-item--${viewMode}`}>
        <SkeletonLoader variant={viewMode === 'list' ? 'card' : 'poster'} />
      </div>
    ));
  };

  if (isLoading && movies.length === 0) {
    return (
      <div className={`movie-list movie-list--${viewMode}`}>
        {renderSkeletons()}
      </div>
    );
  }

  return (
    <div className={`movie-list movie-list--${viewMode}`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          viewMode={viewMode}
          onClick={() => onMovieClick(movie)}
        />
      ))}
      
      {isLoading && movies.length > 0 && renderSkeletons()}
    </div>
  );
};

export default MovieList;