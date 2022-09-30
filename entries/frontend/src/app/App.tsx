import { FC, lazy } from 'react';
import { Route } from 'react-router-dom';

import { AppProvider } from 'frontend/app/providers';
import { routes } from 'frontend/shared/config';
import { ConfirmEmailPage } from 'frontend/pages/ConfirmEmailPage';

const RegisterPage = lazy(() => import('frontend/pages/RegisterPage'));
const LoginPage = lazy(() => import('frontend/pages/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('frontend/pages/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('frontend/pages/ChangePasswordPage'),
);

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => (
  <AppProvider>
    <Route path={routes.login} element={<LoginPage />} />
    <Route path={routes.registration} element={<RegisterPage />} />
    <Route path={routes.confirmEmail} element={<ConfirmEmailPage />} />
    <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
    <Route path={routes.changePassword} element={<ChangePasswordPage />} />
  </AppProvider>
);
