import React, { useState, useEffect, useCallback } from 'react';
import { Movie, ActiveTab, ViewMode } from './types/movie';
import { apiService } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/Header/Header';
import TabBar from './components/TabBar/TabBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './App.scss';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('now_playing');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkTheme ? '' : 'light-theme';
  }, [isDarkTheme]);

  const fetchMovies = useCallback(async (tab: ActiveTab, page: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setShowLoadingOverlay(true);
      }
      setIsLoading(true);
      setError(null);
      
      const response = tab === 'now_playing' 
        ? await apiService.getNowPlayingMovies(page)
        : await apiService.getTopRatedMovies(page);
      
      if (append) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results);
      }
      
      setHasMorePages(page < response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load movies. Please check your connection and try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
      setShowLoadingOverlay(false);
    }
  }, []);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setShowLoadingOverlay(true);
      setIsLoading(true);
      setError(null);
      const response = await apiService.searchMovies(query);
      setSearchResults(response.results);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
      setShowLoadingOverlay(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(activeTab);
  }, [activeTab, fetchMovies]);

  useEffect(() => {
    searchMovies(debouncedSearchQuery);
  }, [debouncedSearchQuery, searchMovies]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleLoadMore = () => {
    if (hasMorePages && !isLoading) {
      fetchMovies(activeTab, currentPage + 1, true);
    }
  };

  const handleRetry = () => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    } else {
      fetchMovies(activeTab);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const displayMovies = searchQuery.trim() ? searchResults : movies;
  const showLoadMore = !searchQuery.trim() && hasMorePages && !isLoading;

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isDarkTheme={isDarkTheme}
        onThemeToggle={handleThemeToggle}
      />
      
      {!searchQuery.trim() && (
        <TabBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}
      
      {searchQuery.trim() && (
        <div className="app__controls">
          <div className="app__controls-container">
            <div className="app__search-info">
              <h2>Search Results for "{searchQuery}"</h2>
              <p>{searchResults.length} movies found</p>
            </div>
          </div>
        </div>
      )}

      <main className="app__main">
        {error ? (
          <ErrorMessage 
            message={error}
            onRetry={handleRetry}
          />
        ) : (
          <>
            <MovieList
              movies={displayMovies}
              viewMode={viewMode}
              isLoading={isLoading && !showLoadingOverlay}
              onMovieClick={handleMovieClick}
            />
            
            {showLoadMore && (
              <div className="app__load-more">
                <button 
                  className="app__load-more-button"
                  onClick={handleLoadMore}
                >
                  Load More Movies
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {showLoadingOverlay && (
        <div className="app__loading-overlay">
          <LoadingSpinner size="large" />
          <div className="app__loading-text">Loading movies...</div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;