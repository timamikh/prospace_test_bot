/**
 * Компонент индикатора загрузки
 * Last Updated: 29-10-2025
 */

import React from 'react';
import clsx from 'clsx';
import './Loading.css';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
}) => {
  const spinner = (
    <div className={clsx('loading-spinner', `loading-spinner--${size}`)}>
      <div className="loading-spinner__circle"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        {spinner}
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loading">
      {spinner}
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

