import { useEffect } from 'react';

import { routes } from 'frontend/shared/config';
import { TStatus } from 'frontend/shared/api/initAuthApi';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { useNavigate } from 'frontend/shared/lib/useNavigate';

/**
 * Перенаправляет на страницу завершения входа.
 */
export const useNavigateToSuccess = (status: TStatus): void => {
  const navigate = useNavigate();
  const redirectFrom = useRedirectFrom();

  useEffect(() => {
    if (status === 'success' && redirectFrom) {
      window.location.assign(redirectFrom);

      return;
    }

    if (status === 'success') {
      navigate(routes.loginSuccess);
    }
  }, [navigate, redirectFrom, status]);
};
