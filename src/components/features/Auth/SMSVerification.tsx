/**
 * Компонент верификации SMS кода
 * Last Updated: 29-10-2025
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@components/ui';
import { SMS_CODE_LENGTH } from '@/utils/constants';
import './SMSVerification.css';

export interface SMSVerificationProps {
  phone: string;
  onSubmit: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
}

export const SMSVerification: React.FC<SMSVerificationProps> = ({
  phone,
  onSubmit,
  onResend,
  isLoading,
}) => {
  const [code, setCode] = useState<string[]>(Array(SMS_CODE_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError('');

    // Автоматический переход к следующему полю
    if (value && index < SMS_CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Автоматическая отправка при заполнении всех полей
    if (newCode.every((digit) => digit) && !value) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    const newCode = pastedData.slice(0, SMS_CODE_LENGTH).split('');
    
    while (newCode.length < SMS_CODE_LENGTH) {
      newCode.push('');
    }
    
    setCode(newCode);
    
    if (newCode.every((digit) => digit)) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleSubmit = async (codeStr?: string) => {
    const fullCode = codeStr || code.join('');

    if (fullCode.length !== SMS_CODE_LENGTH) {
      setError('Введите полный код');
      return;
    }

    await onSubmit(fullCode);
  };

  const handleResend = async () => {
    setCountdown(60);
    setCode(Array(SMS_CODE_LENGTH).fill(''));
    await onResend();
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="sms-verification">
      <div className="sms-verification__header">
        <h2 className="sms-verification__title">Подтверждение</h2>
        <p className="sms-verification__description">
          Введите код из SMS, отправленный на номер
        </p>
        <p className="sms-verification__phone">{phone}</p>
      </div>

      <div className="sms-verification__code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isLoading}
            className="sms-verification__code-input"
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error && <p className="sms-verification__error">{error}</p>}

      <Button
        fullWidth
        onClick={() => handleSubmit()}
        loading={isLoading}
        disabled={code.some((d) => !d) || isLoading}
      >
        Подтвердить
      </Button>

      <div className="sms-verification__resend">
        {countdown > 0 ? (
          <p className="sms-verification__countdown">
            Повторная отправка через {countdown} сек
          </p>
        ) : (
          <Button variant="ghost" onClick={handleResend} disabled={isLoading}>
            Отправить код повторно
          </Button>
        )}
      </div>
    </div>
  );
};

