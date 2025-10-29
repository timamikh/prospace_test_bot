/**
 * Карточка инцидента
 * Last Updated: 29-10-2025
 */

import React from 'react';
import { Card, CardContent, StatusBadge } from '@components/ui';
import { Incident } from '@types/index';
import { formatRelativeTime, formatStatus, truncateText } from '@/utils/formatters';
import './IncidentCard.css';

export interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  const getPriorityIcon = (priority: string): string => {
    const icons: Record<string, string> = {
      low: '🟢',
      medium: '🟡',
      high: '🟠',
      critical: '🔴',
    };
    return icons[priority] || '⚪';
  };

  const getTypeIcon = (type: string): string => {
    const icons: Record<string, string> = {
      accident: '🚗',
      breakdown: '🔧',
      delay: '⏰',
      documentation: '📄',
      safety: '⚠️',
      other: '📌',
    };
    return icons[type] || '📌';
  };

  return (
    <Card className="incident-card" onClick={onClick} hoverable>
      <CardContent>
        <div className="incident-card__header">
          <div className="incident-card__header-left">
            <span className="incident-card__type-icon">{getTypeIcon(incident.type)}</span>
            <span className="incident-card__type">{formatStatus(incident.type)}</span>
          </div>
          <StatusBadge status={incident.status} size="sm" />
        </div>

        <p className="incident-card__description">
          {truncateText(incident.description, 120)}
        </p>

        <div className="incident-card__footer">
          <div className="incident-card__footer-left">
            <span className="incident-card__priority">
              {getPriorityIcon(incident.priority)} {formatStatus(incident.priority)}
            </span>
            {incident.mediaFiles.length > 0 && (
              <span className="incident-card__media">
                📎 {incident.mediaFiles.length}
              </span>
            )}
          </div>
          <span className="incident-card__time">
            {formatRelativeTime(incident.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

