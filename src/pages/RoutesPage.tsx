/**
 * Страница списка маршрутов
 * Last Updated: 29-10-2025
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteCard } from '@/components/features/Routes/RouteCard';
import { Loading } from '@components/ui';
import { useRouteStore } from '@/stores/routeStore';
import './RoutesPage.css';

export const RoutesPage: React.FC = () => {
  const navigate = useNavigate();
  const { routes, fetchRoutes, isLoading, hasMore, currentPage } = useRouteStore();

  useEffect(() => {
    if (routes.length === 0) {
      fetchRoutes();
    }
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchRoutes(undefined, currentPage + 1);
    }
  };

  return (
    <div className="routes-page">
      <div className="routes-page__header">
        <button
          className="routes-page__back-button"
          onClick={() => navigate('/')}
        >
          ← Назад
        </button>
        <h1 className="routes-page__title">Мои маршруты</h1>
      </div>

      <div className="routes-page__content">
        {isLoading && routes.length === 0 ? (
          <Loading text="Загрузка маршрутов..." />
        ) : routes.length === 0 ? (
          <div className="routes-page__empty">
            <div className="routes-page__empty-icon">🗺️</div>
            <p className="routes-page__empty-text">Нет доступных маршрутов</p>
          </div>
        ) : (
          <>
            <div className="routes-page__list">
              {routes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onClick={() => navigate(`/routes/${route.id}`)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="routes-page__load-more">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="routes-page__load-more-button"
                >
                  {isLoading ? 'Загрузка...' : 'Загрузить еще'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

