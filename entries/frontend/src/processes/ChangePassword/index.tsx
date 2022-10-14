import { FC, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from 'frontend/processes/ChangePassword/lib/routes';
import { useNavigate } from 'frontend/shared/lib';

const ForgotPasswordPage = lazy(
  () => import('frontend/pages/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('frontend/pages/ChangePasswordPage'),
);

const ChangePassword: FC = () => {
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
          <ForgotPasswordPage
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
        element={confirmData && <ChangePasswordPage data={confirmData} />}
      />
    </Routes>
  );
};

/**
 * Процесс регистрации, объединяющий регистрацию и подтверждение email.
 */
export default ChangePassword;
