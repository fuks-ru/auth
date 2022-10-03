import { FC, lazy, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { routes } from 'frontend/processes/Registration/model/routes';

const RegisterPage = lazy(() => import('frontend/pages/RegisterPage'));
const ConfirmEmailPage = lazy(() => import('frontend/pages/ConfirmEmailPage'));

const Registration: FC = () => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={routes.root}
        element={
          <RegisterPage
            onFinishEmail={setEmail}
            onSuccess={() => {
              navigate(`.${routes.confirmEmail}`);
            }}
          />
        }
      />
      <Route
        path={routes.confirmEmail}
        element={<ConfirmEmailPage email={email} />}
      />
    </Routes>
  );
};

/**
 * Процесс регистрации, объединяющий регистрацию и подтверждение email.
 */
export default Registration;
