import { FC, lazy } from 'react';
import { Route } from 'react-router-dom';

import { AppProvider } from 'frontend/app/providers';
import { routes } from 'frontend/shared/config';
import { Layout } from 'frontend/widgets/Layout';

const Registration = lazy(() => import('frontend/processes/Registration'));
const LoginSuccessPage = lazy(() => import('frontend/pages/LoginSuccessPage'));
const LoginPage = lazy(() => import('frontend/pages/LoginPage'));
const ChangePassword = lazy(() => import('frontend/processes/ChangePassword'));

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => (
  <AppProvider Wrapper={Layout}>
    <Route path={routes.login} element={<LoginPage />} />
    <Route path={`${routes.registration}/*`} element={<Registration />} />
    <Route path={`${routes.changePassword}/*`} element={<ChangePassword />} />
    <Route path={routes.loginSuccess} element={<LoginSuccessPage />} />
  </AppProvider>
);
