import { FC, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from 'frontend/processes/Registration/model/routes';
import { useNavigate } from 'frontend/shared/lib';

const RegisterPage = lazy(() => import('frontend/pages/RegisterPage'));
const ConfirmPage = lazy(() => import('frontend/pages/ConfirmPage'));

const Registration: FC = () => {
  const [confirmData, setConfirmData] = useState<{
    type: 'phone' | 'email';
    value: string;
  } | null>();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={routes.root}
        element={
          <RegisterPage
            onFinishPhone={(phone) => {
              setConfirmData({ type: 'phone', value: phone });
            }}
            onFinishEmail={(email) => {
              setConfirmData({ type: 'email', value: email });
            }}
            onSuccess={() => {
              navigate(`.${routes.confirm}`);
            }}
          />
        }
      />
      <Route
        path={routes.confirm}
        element={confirmData && <ConfirmPage data={confirmData} />}
      />
    </Routes>
  );
};

/**
 * Процесс регистрации, объединяющий регистрацию и подтверждение email.
 */
export default Registration;
