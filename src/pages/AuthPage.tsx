/**
 * Страница авторизации
 * Last Updated: 29-10-2025
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from '@/components/features/Auth/PhoneInput';
import { SMSVerification } from '@/components/features/Auth/SMSVerification';
import { useAuthStore } from '@/stores/authStore';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { sendSMSCode, verifySMSCode, isLoading, error } = useAuthStore();
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [phone, setPhone] = useState('');

  const handleSendCode = async (phoneNumber: string) => {
    const success = await sendSMSCode(phoneNumber);
    if (success) {
      setPhone(phoneNumber);
      setStep('verification');
    }
  };

  const handleVerifyCode = async (code: string) => {
    const success = await verifySMSCode(phone, code);
    if (success) {
      navigate('/');
    }
  };

  const handleResendCode = async () => {
    await sendSMSCode(phone);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__logo">
          <div className="auth-page__logo-icon">🚛</div>
          <h1 className="auth-page__logo-text">TMS Driver</h1>
        </div>

        {step === 'phone' ? (
          <PhoneInput onSubmit={handleSendCode} isLoading={isLoading} />
        ) : (
          <SMSVerification
            phone={phone}
            onSubmit={handleVerifyCode}
            onResend={handleResendCode}
            isLoading={isLoading}
          />
        )}

        {error && <div className="auth-page__error">{error}</div>}
      </div>
    </div>
  );
};

