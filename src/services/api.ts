import { Movie, MovieResponse, MovieDetails, SearchResponse } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmJhYTVkZWNkZjU3YWY2OGE5NTRjZTE5YTQ0ZjVkOCIsIm5iZiI6MTY5NDM0MDY0OC4yODgsInN1YiI6IjY0ZmQ5NjI4MmRmZmQ4MDBlM2QyYjE4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OGPtXhRax6_MisJ0vNEf0Pa5LwGzftGnol2p0TbcOSE';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`
  }
};

export const apiService = {
  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/now_playing?language=en-US&page=${page}`,
        options
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/top_rated?language=en-US&page=${page}`,
        options
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}?language=en-US`,
        options
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
        options
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }
};