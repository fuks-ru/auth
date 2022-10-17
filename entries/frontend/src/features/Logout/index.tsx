import { Button } from 'antd';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';

import { useAuthApi } from 'frontend/shared/api';
import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';

/**
 * Осуществляет выход из системы.
 */
export const Logout: FC = () => {
  const [logout, , status] = useAuthApi('logout');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (status === 'success') {
      navigate(routes.login);
    }
  }, [navigate, status]);

  return (
    <SButton
      type='primary'
      htmlType='submit'
      disabled={status === 'pending'}
      onClick={() => logout({})}
    >
      {t('logout')}
    </SButton>
  );
};

const SButton = styled(Button)`
  position: fixed !important;
  left: 10px;
  top: 10px;
`;
