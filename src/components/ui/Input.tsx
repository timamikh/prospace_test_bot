/**
 * Компонент поля ввода
 * Last Updated: 29-10-2025
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx('input-wrapper', { 'input-wrapper--full-width': fullWidth })}>
        {label && <label className="input-label">{label}</label>}
        
        <div className={clsx('input-container', { 'input-container--error': error })}>
          {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}
          
          <input
            ref={ref}
            className={clsx('input', className)}
            {...props}
          />
          
          {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
        </div>
        
        {error && <span className="input-error">{error}</span>}
        {!error && helperText && <span className="input-helper">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

