import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign, 
  Globe,
  X
} from 'lucide-react';
import { MovieDetails as MovieDetailsType, Movie } from '../../types/movie';
import { apiService } from '../../services/api';
import { getPosterUrl, getBackdropUrl, formatDate, formatRuntime, formatCurrency } from '../../utils/image';
import LazyImage from '../LazyImage/LazyImage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './MovieDetails.scss';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await apiService.getMovieDetails(movie.id);
        setMovieDetails(details);
      } catch (err) {
        setError('Failed to load movie details. Please try again.');
        console.error('Error fetching movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  const handleClose = () => {
    onClose();
  };

  if (isLoading) {
    return (
      <div className="movie-details">
        <div className="movie-details__header">
          <button className="movie-details__close" onClick={handleClose}>
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="movie-details__loading">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="movie-details">
        <div className="movie-details__header">
          <button className="movie-details__close" onClick={handleClose}>
            <ArrowLeft size={24} />
          </button>
        </div>
        <ErrorMessage 
          message={error || 'Movie details not found'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movieDetails.backdrop_path);
  const posterUrl = getPosterUrl(movieDetails.poster_path);

  return (
    <div className="movie-details">
      <button className="movie-details__close" onClick={handleClose}>
        <X size={24} />
      </button>
      
      <div className="movie-details__backdrop">
        <LazyImage
          src={backdropUrl}
          alt={movieDetails.title}
          className="movie-details__backdrop-image"
          skeletonVariant="backdrop"
        />
        <div className="movie-details__backdrop-overlay"></div>
      </div>

      <div className="movie-details__content">
        <div className="movie-details__main">
          <div className="movie-details__poster">
            <LazyImage
              src={posterUrl}
              alt={movieDetails.title}
              className="movie-details__poster-image"
              skeletonVariant="poster"
            />
          </div>

          <div className="movie-details__info">
            <h1 className="movie-details__title">{movieDetails.title}</h1>
            
            {movieDetails.tagline && (
              <p className="movie-details__tagline">"{movieDetails.tagline}"</p>
            )}

            <div className="movie-details__meta">
              <div className="movie-details__rating">
                <Star size={20} />
                <span>{movieDetails.vote_average.toFixed(1)}</span>
                <span className="movie-details__votes">
                  ({movieDetails.vote_count.toLocaleString()} votes)
                </span>
              </div>

              <div className="movie-details__date">
                <Calendar size={20} />
                <span>{formatDate(movieDetails.release_date)}</span>
              </div>

              {movieDetails.runtime && (
                <div className="movie-details__runtime">
                  <Clock size={20} />
                  <span>{formatRuntime(movieDetails.runtime)}</span>
                </div>
              )}
            </div>

            <div className="movie-details__genres">
              {movieDetails.genres.map((genre) => (
                <span key={genre.id} className="movie-details__genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-details__overview">
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
            </div>

            <div className="movie-details__additional">
              <div className="movie-details__section">
                <h4>Additional Information</h4>
                <div className="movie-details__grid">
                  <div className="movie-details__item">
                    <span className="movie-details__label">Status:</span>
                    <span>{movieDetails.status}</span>
                  </div>
                  
                  <div className="movie-details__item">
                    <span className="movie-details__label">Original Language:</span>
                    <span>{movieDetails.original_language.toUpperCase()}</span>
                  </div>

                  {movieDetails.budget > 0 && (
                    <div className="movie-details__item">
                      <DollarSign size={16} />
                      <span className="movie-details__label">Budget:</span>
                      <span>{formatCurrency(movieDetails.budget)}</span>
                    </div>
                  )}

                  {movieDetails.revenue > 0 && (
                    <div className="movie-details__item">
                      <DollarSign size={16} />
                      <span className="movie-details__label">Revenue:</span>
                      <span>{formatCurrency(movieDetails.revenue)}</span>
                    </div>
                  )}
                </div>
              </div>

              {movieDetails.production_companies.length > 0 && (
                <div className="movie-details__section">
                  <h4>Production Companies</h4>
                  <div className="movie-details__companies">
                    {movieDetails.production_companies.map((company) => (
                      <span key={company.id} className="movie-details__company">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movieDetails.production_countries.length > 0 && (
                <div className="movie-details__section">
                  <h4>Production Countries</h4>
                  <div className="movie-details__countries">
                    {movieDetails.production_countries.map((country) => (
                      <span key={country.iso_3166_1} className="movie-details__country">
                        <Globe size={16} />
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;