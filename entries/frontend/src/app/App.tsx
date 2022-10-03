import { FC, lazy } from 'react';
import { Route } from 'react-router-dom';

import { AppProvider } from 'frontend/app/providers';
import { routes } from 'frontend/shared/config';
import { Layout } from 'frontend/widgets/Layout';

const Registration = lazy(() => import('frontend/processes/Registration'));
const LoginSuccessPage = lazy(() => import('frontend/pages/LoginSuccessPage'));
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
  <AppProvider Wrapper={Layout}>
    <Route path={routes.login} element={<LoginPage />} />
    <Route path={`${routes.registration}/*`} element={<Registration />} />
    <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
    <Route path={routes.changePassword} element={<ChangePasswordPage />} />
    <Route path={routes.loginSuccess} element={<LoginSuccessPage />} />
  </AppProvider>
);
