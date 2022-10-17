import { FC, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from 'frontend/processes/Registration/lib/routes';
import { useNavigate } from 'frontend/shared/lib';
import { TConfirmPageData } from 'frontend/pages/ConfirmPage';

const LoginSuccessPage = lazy(() => import('frontend/pages/LoginSuccessPage'));
const ConfirmPage = lazy(() => import('frontend/pages/ConfirmPage'));

const ConfirmContact: FC = () => {
  const [confirmData, setConfirmData] = useState<TConfirmPageData | null>();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={routes.root}
        element={
          <LoginSuccessPage
            onFinishPhone={(phone) => {
              setConfirmData({
                type: 'phone',
                value: phone,
                method: 'confirmContact',
              });
            }}
            onFinishEmail={(email) => {
              setConfirmData({
                type: 'email',
                value: email,
                method: 'confirmContact',
              });
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
export default ConfirmContact;
