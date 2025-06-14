import React from 'react';
import { ActiveTab } from '../../types/movie';
import './TabBar.scss';

interface TabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'now_playing' as ActiveTab, label: 'Now Playing' },
    { id: 'top_rated' as ActiveTab, label: 'Top Rated' }
  ];

  return (
    <div className="tab-bar">
      <div className="tab-bar__container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-bar__tab ${activeTab === tab.id ? 'tab-bar__tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;