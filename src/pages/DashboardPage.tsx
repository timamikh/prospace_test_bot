/**
 * Главная страница (Dashboard)
 * Last Updated: 29-10-2025
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusPanel } from '@/components/features/Dashboard/StatusPanel';
import { RouteCard } from '@/components/features/Routes/RouteCard';
import { Button, Card, CardHeader, CardTitle, CardContent, Loading } from '@components/ui';
import { useAuthStore } from '@/stores/authStore';
import { useRouteStore } from '@/stores/routeStore';
import { useAppStore } from '@/stores/appStore';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    activeRoute,
    fetchActiveRoute,
    markArrival,
    markDeparture,
    isLoading,
  } = useRouteStore();
  const { unreadCount, fetchUnreadCount } = useAppStore();

  useEffect(() => {
    fetchActiveRoute();
    fetchUnreadCount();
  }, [fetchActiveRoute, fetchUnreadCount]);

  const handleMarkArrival = async () => {
    if (activeRoute) {
      const success = await markArrival(activeRoute.id);
      if (success) {
        await fetchActiveRoute();
      }
    }
  };

  const handleMarkDeparture = async () => {
    if (activeRoute) {
      const success = await markDeparture(activeRoute.id);
      if (success) {
        await fetchActiveRoute();
      }
    }
  };

  if (isLoading && !activeRoute) {
    return <Loading fullScreen text="Загрузка..." />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <h1 className="dashboard-page__title">Добро пожаловать</h1>
          <p className="dashboard-page__subtitle">{user?.name || 'Водитель'}</p>
        </div>
        {unreadCount > 0 && (
          <div className="dashboard-page__notifications">
            <span className="dashboard-page__notifications-badge">{unreadCount}</span>
            🔔
          </div>
        )}
      </div>

      <div className="dashboard-page__content">
        <StatusPanel
          currentStatus={activeRoute?.status || 'inactive' as any}
          routeId={activeRoute?.id}
          onMarkArrival={handleMarkArrival}
          onMarkDeparture={handleMarkDeparture}
          isLoading={isLoading}
        />

        {activeRoute && (
          <Card>
            <CardHeader>
              <CardTitle>Активный маршрут</CardTitle>
            </CardHeader>
            <CardContent>
              <RouteCard
                route={activeRoute}
                onClick={() => navigate(`/routes/${activeRoute.id}`)}
              />
            </CardContent>
          </Card>
        )}

        <div className="dashboard-page__quick-actions">
          <Button
            fullWidth
            variant="secondary"
            onClick={() => navigate('/routes')}
            icon="🗺️"
            iconPosition="left"
          >
            Все маршруты
          </Button>
          <Button
            fullWidth
            variant="danger"
            onClick={() => navigate('/incidents/create')}
            icon="⚠️"
            iconPosition="left"
          >
            Создать инцидент
          </Button>
        </div>
      </div>
    </div>
  );
};

