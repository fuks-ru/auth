import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'frontend/shared/config';
import { TStatus } from 'frontend/shared/api/initAuthApi';

export const useNavigateToSuccess = (status: TStatus): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      navigate(routes.loginSuccess);
    }
  }, [navigate, status]);
};
