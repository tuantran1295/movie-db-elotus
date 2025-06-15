# Elotus Movie

A modern, responsive movie discovery web application built with React and TypeScript. Browse the latest movies, discover top-rated films, and explore detailed movie information with a beautiful, cinema-inspired interface.

## Features

### Core Functionality
- **Movie Discovery**: Browse currently playing movies and top-rated films
- **Advanced Search**: Real-time movie search with debounced input
- **Detailed Movie Information**: View comprehensive movie details including cast, crew, budget, revenue, and production information
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop

### User Experience
- **Dual View Modes**: Switch between grid and list view layouts
- **Theme Toggle**: Dark and light theme support with smooth transitions
- **Lazy Loading**: Optimized image loading with intersection observer
- **Skeleton Loading**: Smooth loading states with animated placeholders
- **Infinite Scroll**: Load more movies with pagination support
- **Error Handling**: Graceful error states with retry functionality

### Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **SCSS Styling**: Custom styling without external CSS frameworks
- **Performance Optimized**: Debounced search, lazy loading, and efficient re-renders
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern React**: Hooks, functional components, and best practices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: SCSS (no external CSS frameworks)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: The Movie Database (TMDB) API
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Performance**: Custom hooks for debouncing and intersection observer

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone git@github.com:tuantran1295/movie-db-elotus.git
cd movie-db-elotus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header with search and theme toggle
│   ├── TabBar/         # Tab navigation and view mode controls
│   ├── MovieList/      # Movie grid/list container
│   ├── MovieCard/      # Individual movie card component
│   ├── MovieDetails/   # Full-screen movie details modal
│   ├── LazyImage/      # Optimized image loading component
│   ├── LoadingSpinner/ # Loading indicator component
│   ├── SkeletonLoader/ # Animated loading placeholders
│   └── ErrorMessage/   # Error state component
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounced value hook
│   └── useIntersectionObserver.ts # Lazy loading hook
├── services/           # API service layer
│   └── api.ts          # TMDB API integration
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie-related types
├── utils/              # Utility functions
│   └── image.ts        # Image URL helpers and formatters
├── App.tsx             # Main application component
├── App.scss            # Global styles
└── main.tsx            # Application entry point
```

## API Integration

This application uses The Movie Database (TMDB) API to fetch movie data. The API provides:

- **Now Playing Movies**: Current theatrical releases
- **Top Rated Movies**: Highest-rated films of all time
- **Movie Search**: Search functionality across the entire movie database
- **Movie Details**: Comprehensive information including cast, crew, budget, and more

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Demo](./assets/User-story-movie-compressed.gif)

## Performance Optimizations

- **Lazy Loading**: Images load only when they enter the viewport
- **Debounced Search**: Search requests are debounced to reduce API calls
- **Skeleton Loading**: Smooth loading states improve perceived performance
- **Efficient Re-renders**: Optimized component updates with useCallback and useMemo
- **Image Optimization**: Multiple image sizes for different screen densities

## License

Copyright [2025] Tran Quoc Tuan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.