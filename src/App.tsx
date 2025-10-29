/**
 * Главный компонент приложения с Telegram интеграцией
 * Last Updated: 29-10-2025
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoutesPage } from './pages/RoutesPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { CreateIncidentPage } from './pages/CreateIncidentPage';
import { useAuthStore } from './stores/authStore';
import { useAppStore } from './stores/appStore';
import { useTelegramInit } from './hooks/useTelegram';
import { Loading } from './components/ui';
import './styles/index.css';

/**
 * Защищенный роут - требует авторизации
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

/**
 * Публичный роут - перенаправляет на Dashboard если авторизован
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { setAppReady } = useAppStore();
  
  // Инициализация Telegram Web App
  useTelegramInit();

  useEffect(() => {
    // Инициализация приложения
    setAppReady(true);
  }, [setAppReady]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные роуты */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Защищенные роуты */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/routes"
          element={
            <ProtectedRoute>
              <RoutesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <IncidentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidents/create"
          element={
            <ProtectedRoute>
              <CreateIncidentPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

