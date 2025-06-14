import React from 'react';
import { Search, Film, Sun, Moon } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkTheme: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  isDarkTheme, 
  onThemeToggle 
}) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Film size={32} />
          <h1>Elotus Movie</h1>
        </div>
        
        <div className="header__search">
          <div className="search-box">
            <Search className="search-box__icon" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-box__input"
            />
          </div>
        </div>

        <button 
          className="header__theme-toggle"
          onClick={onThemeToggle}
          title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDarkTheme ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;