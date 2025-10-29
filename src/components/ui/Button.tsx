/**
 * Компонент кнопки
 * Last Updated: 29-10-2025
 */

import React from 'react';
import clsx from 'clsx';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        {
          'button--full-width': fullWidth,
          'button--loading': loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="button__spinner animate-spin">⟳</span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      {!loading && children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};

