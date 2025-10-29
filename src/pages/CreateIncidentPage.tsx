/**
 * Страница создания инцидента
 * Last Updated: 29-10-2025
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IncidentForm } from '@/components/features/Incidents/IncidentForm';
import { useIncidentStore } from '@/stores/incidentStore';
import { IncidentFormData } from '@types/index';
import './CreateIncidentPage.css';

export const CreateIncidentPage: React.FC = () => {
  const navigate = useNavigate();
  const { createIncident, isLoading } = useIncidentStore();

  const handleSubmit = async (data: IncidentFormData) => {
    const success = await createIncident(data);
    if (success) {
      navigate('/incidents');
    }
  };

  return (
    <div className="create-incident-page">
      <div className="create-incident-page__header">
        <button
          className="create-incident-page__back-button"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
        <h1 className="create-incident-page__title">Новый инцидент</h1>
      </div>

      <div className="create-incident-page__content">
        <IncidentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

