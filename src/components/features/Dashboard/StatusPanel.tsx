/**
 * Панель управления статусом водителя
 * Last Updated: 29-10-2025
 */

import React from 'react';
import { Button, StatusBadge, Card, CardHeader, CardTitle, CardContent } from '@components/ui';
import { TripStatus } from '@types/index';
import './StatusPanel.css';

export interface StatusPanelProps {
  currentStatus: TripStatus;
  routeId?: string;
  onMarkArrival: () => Promise<void>;
  onMarkDeparture: () => Promise<void>;
  isLoading?: boolean;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  currentStatus,
  routeId,
  onMarkArrival,
  onMarkDeparture,
  isLoading,
}) => {
  const canMarkArrival = [TripStatus.IN_TRANSIT, TripStatus.DEPARTED].includes(currentStatus);
  const canMarkDeparture = [TripStatus.ARRIVED, TripStatus.LOADING, TripStatus.UNLOADING].includes(
    currentStatus
  );

  return (
    <Card className="status-panel">
      <CardHeader>
        <CardTitle>Статус рейса</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="status-panel__current">
          <span className="status-panel__label">Текущий статус:</span>
          <StatusBadge status={currentStatus} size="md" dot />
        </div>

        {routeId && (
          <div className="status-panel__actions">
            <Button
              fullWidth
              size="lg"
              onClick={onMarkArrival}
              disabled={!canMarkArrival || isLoading}
              loading={isLoading}
              icon="✓"
            >
              Отметить прибытие
            </Button>

            <Button
              fullWidth
              size="lg"
              variant="secondary"
              onClick={onMarkDeparture}
              disabled={!canMarkDeparture || isLoading}
              loading={isLoading}
              icon="🚛"
            >
              Отметить убытие
            </Button>
          </div>
        )}

        {!routeId && (
          <p className="status-panel__no-route">
            Нет активного маршрута
          </p>
        )}
      </CardContent>
    </Card>
  );
};

