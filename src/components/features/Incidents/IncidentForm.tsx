/**
 * Форма создания инцидента
 * Last Updated: 29-10-2025
 */

import React, { useState } from 'react';
import { Button, Input, MediaUploader } from '@components/ui';
import { IncidentType, IncidentPriority, IncidentFormData } from '@types/index';
import './IncidentForm.css';

export interface IncidentFormProps {
  onSubmit: (data: IncidentFormData) => Promise<void>;
  isLoading?: boolean;
}

export const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IncidentType>(IncidentType.OTHER);
  const [priority, setPriority] = useState<IncidentPriority>(IncidentPriority.MEDIUM);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = 'Введите описание инцидента';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      description: description.trim(),
      type,
      priority,
      mediaFiles: files,
    });
  };

  const incidentTypes = [
    { value: IncidentType.ACCIDENT, label: 'ДТП' },
    { value: IncidentType.BREAKDOWN, label: 'Поломка' },
    { value: IncidentType.DELAY, label: 'Задержка' },
    { value: IncidentType.DOCUMENTATION, label: 'Документы' },
    { value: IncidentType.SAFETY, label: 'Безопасность' },
    { value: IncidentType.OTHER, label: 'Другое' },
  ];

  const priorities = [
    { value: IncidentPriority.LOW, label: 'Низкий', icon: '🟢' },
    { value: IncidentPriority.MEDIUM, label: 'Средний', icon: '🟡' },
    { value: IncidentPriority.HIGH, label: 'Высокий', icon: '🟠' },
    { value: IncidentPriority.CRITICAL, label: 'Критичный', icon: '🔴' },
  ];

  return (
    <form onSubmit={handleSubmit} className="incident-form">
      <div className="incident-form__field">
        <label className="incident-form__label">Тип инцидента *</label>
        <div className="incident-form__type-buttons">
          {incidentTypes.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setType(item.value)}
              className={`incident-form__type-button ${
                type === item.value ? 'incident-form__type-button--active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="incident-form__field">
        <label className="incident-form__label">Приоритет *</label>
        <div className="incident-form__priority-buttons">
          {priorities.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPriority(item.value)}
              className={`incident-form__priority-button ${
                priority === item.value ? 'incident-form__priority-button--active' : ''
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="incident-form__field">
        <label className="incident-form__label">Описание *</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) {
              setErrors({ ...errors, description: '' });
            }
          }}
          placeholder="Опишите подробно что произошло..."
          className="incident-form__textarea"
          rows={5}
          disabled={isLoading}
        />
        {errors.description && (
          <span className="incident-form__error">{errors.description}</span>
        )}
      </div>

      <div className="incident-form__field">
        <label className="incident-form__label">Фото/Видео</label>
        <MediaUploader files={files} onFilesChange={setFiles} maxFiles={5} />
      </div>

      <Button type="submit" fullWidth size="lg" loading={isLoading}>
        Отправить инцидент
      </Button>
    </form>
  );
};

