/**
 * Компонент ввода номера телефона
 * Last Updated: 29-10-2025
 */

import React, { useState } from 'react';
import { Button, Input } from '@components/ui';
import { validatePhone } from '@/utils/validators';
import { formatPhoneNumber } from '@/utils/formatters';
import './PhoneInput.css';

export interface PhoneInputProps {
  onSubmit: (phone: string) => Promise<void>;
  isLoading?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit, isLoading }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setError('Введите номер телефона');
      return;
    }

    const fullPhone = phone.startsWith('7') ? `+${phone}` : `+7${phone}`;

    if (!validatePhone(fullPhone)) {
      setError('Неверный формат номера телефона');
      return;
    }

    await onSubmit(fullPhone);
  };

  return (
    <form onSubmit={handleSubmit} className="phone-input">
      <div className="phone-input__header">
        <h2 className="phone-input__title">Вход в систему</h2>
        <p className="phone-input__description">
          Введите номер телефона для получения кода подтверждения
        </p>
      </div>

      <Input
        type="tel"
        label="Номер телефона"
        placeholder="+7 (___) ___-__-__"
        value={formatPhoneNumber(phone)}
        onChange={handlePhoneChange}
        error={error}
        leftIcon="📱"
        disabled={isLoading}
        autoFocus
      />

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={!phone || isLoading}
      >
        Получить код
      </Button>
    </form>
  );
};

