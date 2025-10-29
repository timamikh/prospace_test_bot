/**
 * Компонент статусного бейджа
 * Last Updated: 29-10-2025
 */

import React from 'react';
import clsx from 'clsx';
import { formatStatus } from '@/utils/formatters';
import './StatusBadge.css';

export interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  size = 'md',
  dot = false,
}) => {
  const getVariantFromStatus = (status: string): string => {
    const statusVariants: Record<string, string> = {
      'active': 'success',
      'completed': 'success',
      'resolved': 'success',
      'arrived': 'success',
      'departed': 'info',
      'in_transit': 'info',
      'loading': 'warning',
      'unloading': 'warning',
      'in_progress': 'warning',
      'inactive': 'default',
      'cancelled': 'error',
      'rejected': 'error',
    };

    return statusVariants[status] || 'default';
  };

  const badgeVariant = variant === 'default' ? getVariantFromStatus(status) : variant;

  return (
    <span
      className={clsx(
        'status-badge',
        `status-badge--${badgeVariant}`,
        `status-badge--${size}`,
        { 'status-badge--dot': dot }
      )}
    >
      {dot && <span className="status-badge__dot"></span>}
      {formatStatus(status)}
    </span>
  );
};

