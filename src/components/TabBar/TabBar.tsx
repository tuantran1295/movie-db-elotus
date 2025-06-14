import React from 'react';
import { Grid, List } from 'lucide-react';
import { ActiveTab, ViewMode } from '../../types/movie';
import './TabBar.scss';

interface TabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const TabBar: React.FC<TabBarProps> = ({ 
  activeTab, 
  onTabChange, 
  viewMode, 
  onViewModeChange 
}) => {
  const tabs = [
    { id: 'now_playing' as ActiveTab, label: 'Now Playing' },
    { id: 'top_rated' as ActiveTab, label: 'Top Rated' }
  ];

  return (
    <div className="tab-bar">
      <div className="tab-bar__container">
        <div className="tab-bar__tabs">
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

        <div className="tab-bar__view-toggle">
          <button
            className={`tab-bar__view-button ${viewMode === 'grid' ? 'tab-bar__view-button--active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            className={`tab-bar__view-button ${viewMode === 'list' ? 'tab-bar__view-button--active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabBar;