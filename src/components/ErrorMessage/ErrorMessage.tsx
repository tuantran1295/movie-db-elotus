import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__icon">
        <AlertCircle size={48} />
      </div>
      <h3 className="error-message__title">Oops! Something went wrong</h3>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry" onClick={onRetry}>
          <RefreshCw size={20} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;