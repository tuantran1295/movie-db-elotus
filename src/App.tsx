import React, { useState, useEffect, useCallback } from 'react';
import { Movie, ActiveTab, ViewMode } from './types/movie';
import { apiService } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/Header/Header';
import TabBar from './components/TabBar/TabBar';
import ViewToggle from './components/ViewToggle/ViewToggle';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
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

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchMovies = useCallback(async (tab: ActiveTab, page: number = 1, append: boolean = false) => {
    try {
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
    }
  }, []);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.searchMovies(query);
      setSearchResults(response.results);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
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

  const displayMovies = searchQuery.trim() ? searchResults : movies;
  const showLoadMore = !searchQuery.trim() && hasMorePages && !isLoading;

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      {!searchQuery.trim() && (
        <TabBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
      
      <div className="app__controls">
        <div className="app__controls-container">
          {searchQuery.trim() && (
            <div className="app__search-info">
              <h2>Search Results for "{searchQuery}"</h2>
              <p>{searchResults.length} movies found</p>
            </div>
          )}
          
          <ViewToggle 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>

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
              isLoading={isLoading}
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