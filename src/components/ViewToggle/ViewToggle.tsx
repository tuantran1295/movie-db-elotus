import React from 'react';
import { Grid, List } from 'lucide-react';
import { ViewMode } from '../../types/movie';
import './ViewToggle.scss';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle__button ${viewMode === 'grid' ? 'view-toggle__button--active' : ''}`}
        onClick={() => onViewModeChange('grid')}
        title="Grid View"
      >
        <Grid size={20} />
      </button>
      <button
        className={`view-toggle__button ${viewMode === 'list' ? 'view-toggle__button--active' : ''}`}
        onClick={() => onViewModeChange('list')}
        title="List View"
      >
        <List size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;