/**
 * Страница списка инцидентов
 * Last Updated: 29-10-2025
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IncidentCard } from '@/components/features/Incidents/IncidentCard';
import { Button, Loading } from '@components/ui';
import { useIncidentStore } from '@/stores/incidentStore';
import { IncidentStatus } from '@types/index';
import './IncidentsPage.css';

export const IncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    incidents,
    fetchIncidents,
    isLoading,
    hasMore,
    currentPage,
    setFilter,
    clearFilter,
    filter,
  } = useIncidentStore();

  const [selectedStatus, setSelectedStatus] = useState<IncidentStatus | 'all'>('all');

  useEffect(() => {
    if (incidents.length === 0) {
      fetchIncidents();
    }
  }, []);

  const handleFilterChange = (status: IncidentStatus | 'all') => {
    setSelectedStatus(status);
    if (status === 'all') {
      clearFilter();
    } else {
      setFilter({ status: [status] });
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchIncidents(filter || undefined, currentPage + 1);
    }
  };

  const statusFilters = [
    { value: 'all', label: 'Все' },
    { value: IncidentStatus.CREATED, label: 'Новые' },
    { value: IncidentStatus.IN_PROGRESS, label: 'В работе' },
    { value: IncidentStatus.RESOLVED, label: 'Решено' },
  ];

  return (
    <div className="incidents-page">
      <div className="incidents-page__header">
        <button
          className="incidents-page__back-button"
          onClick={() => navigate('/')}
        >
          ← Назад
        </button>
        <h1 className="incidents-page__title">Мои инциденты</h1>
      </div>

      <div className="incidents-page__filters">
        {statusFilters.map((item) => (
          <button
            key={item.value}
            onClick={() => handleFilterChange(item.value as any)}
            className={`incidents-page__filter-button ${
              selectedStatus === item.value
                ? 'incidents-page__filter-button--active'
                : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="incidents-page__content">
        {isLoading && incidents.length === 0 ? (
          <Loading text="Загрузка инцидентов..." />
        ) : incidents.length === 0 ? (
          <div className="incidents-page__empty">
            <div className="incidents-page__empty-icon">📋</div>
            <p className="incidents-page__empty-text">Нет инцидентов</p>
            <Button onClick={() => navigate('/incidents/create')}>
              Создать инцидент
            </Button>
          </div>
        ) : (
          <>
            <div className="incidents-page__list">
              {incidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onClick={() => navigate(`/incidents/${incident.id}`)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="incidents-page__load-more">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="incidents-page__load-more-button"
                >
                  {isLoading ? 'Загрузка...' : 'Загрузить еще'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="incidents-page__fab">
        <button
          className="incidents-page__fab-button"
          onClick={() => navigate('/incidents/create')}
          aria-label="Создать инцидент"
        >
          +
        </button>
      </div>
    </div>
  );
};

