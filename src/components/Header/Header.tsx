import React from 'react';
import { Search, Film } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Film size={32} />
          <h1>MovieDB</h1>
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
      </div>
    </header>
  );
};

export default Header;