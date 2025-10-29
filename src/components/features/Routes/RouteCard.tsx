/**
 * Карточка маршрута
 * Last Updated: 29-10-2025
 */

import React from 'react';
import { Card, CardContent, StatusBadge } from '@components/ui';
import { Route } from '@types/index';
import { formatDateTime, formatDistance, formatWeight } from '@/utils/formatters';
import './RouteCard.css';

export interface RouteCardProps {
  route: Route;
  onClick?: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onClick }) => {
  return (
    <Card className="route-card" onClick={onClick} hoverable>
      <CardContent className="route-card__content">
        <div className="route-card__header">
          <StatusBadge status={route.status} size="sm" dot />
          <span className="route-card__time">
            {formatDateTime(route.startTime)}
          </span>
        </div>

        <div className="route-card__locations">
          <div className="route-card__location">
            <span className="route-card__location-icon">📍</span>
            <div className="route-card__location-info">
              <span className="route-card__location-label">Откуда:</span>
              <span className="route-card__location-address">{route.from.address}</span>
            </div>
          </div>

          <div className="route-card__arrow">→</div>

          <div className="route-card__location">
            <span className="route-card__location-icon">🎯</span>
            <div className="route-card__location-info">
              <span className="route-card__location-label">Куда:</span>
              <span className="route-card__location-address">{route.to.address}</span>
            </div>
          </div>
        </div>

        {(route.distance || route.cargoWeight) && (
          <div className="route-card__details">
            {route.distance && (
              <div className="route-card__detail">
                <span className="route-card__detail-icon">📏</span>
                <span>{formatDistance(route.distance)}</span>
              </div>
            )}
            {route.cargoWeight && (
              <div className="route-card__detail">
                <span className="route-card__detail-icon">⚖️</span>
                <span>{formatWeight(route.cargoWeight)}</span>
              </div>
            )}
            {route.cargoType && (
              <div className="route-card__detail">
                <span className="route-card__detail-icon">📦</span>
                <span>{route.cargoType}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

